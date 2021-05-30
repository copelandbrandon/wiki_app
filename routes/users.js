/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { query } = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT posts.*, users.name, types.*
    FROM posts INNER JOIN users ON users.id = poster_id
    INNER JOIN types ON resource_type_id = types.id;`)
      .then(data => {
        console.log('inside the then', data.rows);
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    let postId = req.params.id;
    db.query(`SELECT posts.*, users.name, comments.*, types.*
    FROM posts INNER JOIN users ON users.id = poster_id
    INNER JOIN comments ON posts.id = post_id
    INNER JOIN types ON resource_type_id = types.id
    WHERE post_id = $1;`, [postId])
      .then(data => {
        console.log(data.rows);
        const post = data.rows;
        res.json({ post });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.get("/search", (req, res) => {
    let topic = req.body.topic;
    let type = req.body.type;
    let title = req.body.title;
    let queryString = `SELECT posts.*, users.name, types.* FROM posts INNER JOIN users ON users.id = poster_id INNER JOIN types ON resource_type_id = types.id`;
    let queryParams = [];

    if (title) {
      queryParams.push(title);
      queryString += ` WHERE posts.title LIKE '%$${queryParams.length}%';`
    };

    if (topic) {
      queryParams.push(topic);
      if (title) {
        queryString += ` AND posts.topic LIKE '%$${queryParams.length}%';`
      } else {
        queryString += ` WHERE posts.topic LIKE '%$${queryParams.length}%';`
      }
    };

    if (type) {
      queryParams.push(type);
      if (title || topic) {
        queryString += ` AND posts.type = '$${queryParams.length}';`;
      } else {
        queryString += ` WHERE posts.type = '$${queryParams.length}';`;
      }
    }

    db.query(queryString, queryParams)
      .then(data => {
        console.log(data.rows);
        const post = data.rows;
        res.json({ post });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.get("/:id/favourites", (req, res) => {
    let userId = req.params.id;
    db.query(`
    SELECT posts.*, favourites.*, users.name, types.*
    FROM posts INNER JOIN favourites ON posts.id = post_id
    INNER JOIN users ON users.id = viewer_id INNER JOIN types
    ON resource_type_id = types.id
    WHERE users.id = $1;
    `, [userId])
      .then(data => {
        console.log(data.rows);
        const post = data.rows;
        res.json({ post });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  })

  router.post("/:id/create", (req, res) => {
    let poster_id = req.params.id;
    let url = req.body.url;
    let title = req.body.title;
    let description = req.body.description;
    let type = req.body.type;
    let topic = req.body.topic;

    db.query(`
      INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [url, title, description, poster_id, type, topic])
      .then(data => {
        console.log(data.rows);
        const post = data.rows;
        res.json({ post });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  })

  router.post("/:id/liked", (req, res) => {
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
        console.log(data.rows);
        const post = data.rows;
        res.json({ post });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  routes.post("/:id/:postid/comment", (req, res) => {
    let comment = req.body.comment;
    let userId = req.params.id;
    let rating = req.body.rating;
    let postid = req.params.postid;

    db.query(`INSERT INTO comments (post_id, commenter_id, rating, comment_body)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [postid, userId, rating, comment])
      .then(data => {
        console.log(data.rows);
        const post = data.rows;
        res.json({ post });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;
};
