const { query, Router } = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT posts.*, posts.id as post_id, users.name AS poster_name, types.*
    FROM posts INNER JOIN users ON users.id = poster_id
    INNER JOIN types ON resource_type_id = types.id;`)
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

  router.post("/get_comments", (req, res) => {
    // let postTitle = req.body.target.split("_")[0];
    // let posterName = req.body.target.split("_")[1];
    const postId = req.body.target;
    db.query(`SELECT comments.*, users.name as username FROM comments
    INNER JOIN posts ON posts.id = post_id
    INNER JOIN users ON users.id = commenter_id
    WHERE post_id = $1;`, [postId])
      .then(data => {
        const posts = data.rows;
        res.json({ posts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.post("/search", (req, res) => {
    let topic = req.body.topic;
    let type = req.body.type;
    let title = req.body.title;
    let queryString = `SELECT posts.*, users.name AS poster_name, types.* FROM posts INNER JOIN users ON users.id = poster_id INNER JOIN types ON resource_type_id = types.id`;
    let queryParams = [];

    if (title !== "") {
      queryParams.push(`%${title}%`);
      queryString += ` WHERE LOWER(posts.title) LIKE LOWER($${queryParams.length})`
    };

    if (topic !== "") {
      queryParams.push(`%${topic}%`);
      if (title) {
        queryString += ` AND LOWER(posts.topic) LIKE LOWER($${queryParams.length})`
      } else {
        queryString += ` WHERE LOWER(posts.topic) LIKE LOWER($${queryParams.length})`
      }
    };

    if (type !== "*") {
      queryParams.push(`${type}`);
      if (title || topic) {
        queryString += ` AND resource_type_id = $${queryParams.length}`;
      } else {
        queryString += ` WHERE resource_type_id = $${queryParams.length}`;
      }
    }

    queryString += ";";

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
  })

  router.get("/favourites", (req, res) => {
    let userId = req.session.userId;
    db.query(`
    SELECT posts.*, favourites.*,  users.name as poster_name FROM users JOIN posts on users.id = poster_id INNER JOIN favourites ON post_id = posts.id WHERE viewer_id = $1;
    `, [userId])
      .then(data => {
        const posts = data.rows;
        res.json({ posts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    })

    router.get("/my_posts", (req, res) => {
      let userId = req.session.userId;
      db.query(`SELECT posts.*, users.name as poster_name FROM posts INNER JOIN users ON users.id = poster_id WHERE poster_id = $1`, [userId])
        .then(data => {
          const posts = data.rows;
          res.json({ posts })
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
  })

  router.post("/create", (req, res) => {
    let poster_id = req.session.userId;
    let url = req.body.url;
    let title = req.body.title;
    let description = req.body.description;
    let type = req.body.type;
    let topic = req.body.topic;

    db.query(`
      INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [url, title, description, poster_id, type, topic])
      .then(()=>{
        return db.query(`SELECT posts.*, users.name AS poster_name, types.*
        FROM posts INNER JOIN users ON users.id = poster_id
        INNER JOIN types ON resource_type_id = types.id WHERE posts.url = $1`, [url])
      })
      .then(data => {
        const posts = data.rows;
        res.json({ posts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  })

  router.post("/liked", (req, res) => {
    let userId = req.params.id;
    let title = req.body.title;
    let user = req.body.user;

    db.query(`
    SELECT posts.id FROM posts
    WHERE name = ${user} AND title = ${title};`)
      .then((post_id) => {
        db.query(`
      INSERT INTO favourites (post_id, viewer_id) VALUES (${post_id}, ${userId});
      `)
      })
      .then(data => {
        const posts = data.rows;
        res.json({ posts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.post("/postid/comment", (req, res) => {
    let comment = req.body.comment;
    let userId = req.params.id;
    let rating = req.body.rating;
    let postid = req.params.postid;

    db.query(`INSERT INTO comments (post_id, commenter_id, rating, comment_body)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [postid, userId, rating, comment])
      .then(data => {
        const posts = data.rows;
        res.json({ posts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;
};
