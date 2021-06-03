const express = require('express');
const router = express.Router();

module.exports = (db) => {
    //GET router for loading posts
    router.get("/", (req, res) => {
      db.query(`SELECT posts.*, posts.id as post_id, users.name AS poster_name, types.*, count(favourites.*) as num_favs
      FROM posts INNER JOIN users ON users.id = poster_id
      INNER JOIN types ON resource_type_id = types.id
      LEFT JOIN favourites ON posts.id = post_id
      GROUP BY posts.id, users.name, types.id
      ORDER BY created_at;`)
        .then(data => {
          const posts = data.rows;
          res.json({ posts });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  
    //GET router for loading users favourites
    router.get("/favourites", (req, res) => {
      let userId = req.session.userId;
      db.query(`
      WITH numFavourite as (SELECT COUNT(favourites.*) as num_favs, posts.*, posts.id as post_id, users.name as poster_name FROM favourites LEFT JOIN posts ON posts.id = post_id LEFT JOIN users ON users.id = poster_id
      GROUP BY posts.id, users.name)
  
      SELECT numFavourite.*, favourites.* FROM numFavourite LEFT JOIN favourites ON numFavourite.id = favourites.post_id WHERE viewer_id = $1;`, [userId])
        .then(data => {
          const posts = data.rows;
          res.json({ posts });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  
    //GET router for loading users own posts
    router.get("/my_posts", (req, res) => {
      let userId = req.session.userId;
      db.query(`SELECT COUNT(favourites.*) as num_favs, posts.*, posts.id as post_id, users.name as poster_name
      FROM favourites
      RIGHT JOIN posts ON posts.id = post_id
      INNER JOIN users ON users.id = posts.poster_id
      WHERE posts.poster_id = $1
      GROUP BY posts.id, users.name
      ORDER BY posts.created_at;`, [userId])
        .then(data => {
          const posts = data.rows;
          res.json({ posts });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  
    //POST router for creating a new post
    router.post("/create", (req, res) => {
      let posterId = req.session.userId;
      let url = req.body.url;
      let title = req.body.title;
      let description = req.body.description;
      let type = req.body.type;
      let topic = req.body.topic;
      db.query(`
        INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [url, title, description, posterId, type, topic])
        .then(() => {
          return db.query(`SELECT posts.*, posts.id as post_id, users.name AS poster_name, types.*, COUNT(favourites.*) as num_favs
          FROM posts INNER JOIN users ON users.id = poster_id
          INNER JOIN types ON resource_type_id = types.id
          LEFT JOIN favourites ON posts.id = post_id
          WHERE posts.url = $1
          GROUP BY posts.id, types.id, users.name;`, [url]);
        })
        .then(data => {
          const posts = data.rows;
          console.log("these are the data", data.rows);
          res.json({ posts });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });

  //GET router for retrieving search results
  router.get("/search", (req, res) => {
    let topic = req.query.topic;
    let type = req.query.type;
    let title = req.query.title;
    let queryString = `SELECT posts.*, posts.id as post_id, users.name AS poster_name, types.*, COUNT(favourites.*) as num_favs
      FROM posts
      INNER JOIN users ON users.id = poster_id
      INNER JOIN types ON resource_type_id = types.id
      LEFT JOIN favourites ON posts.id = favourites.post_id`;
    let queryParams = [];
    if (title !== "") {
      queryParams.push(`%${title}%`);
      queryString += ` WHERE LOWER(posts.title) LIKE LOWER($${queryParams.length})`;
    }
    if (topic !== "") {
      queryParams.push(`%${topic}%`);
      if (title) {
        queryString += ` AND LOWER(posts.topic) LIKE LOWER($${queryParams.length})`;
      } else {
        queryString += ` WHERE LOWER(posts.topic) LIKE LOWER($${queryParams.length})`;
      }
    }
    if (type !== "*") {
      queryParams.push(`${type}`);
      if (title || topic) {
        queryString += ` AND resource_type_id = $${queryParams.length}`;
      } else {
        queryString += ` WHERE resource_type_id = $${queryParams.length}`;
      }
    }
    queryString += ` GROUP BY posts.id, users.name, types.id
      ORDER BY posts.created_at;`;
    db.query(queryString, queryParams)
      .then(data => {
        const posts = data.rows;
        res.json({ posts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};