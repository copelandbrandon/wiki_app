/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //GET router for retrieving comments
  router.get("/get_comments", (req, res) => {
    const postId = req.query.target;
    db.query(`SELECT comments.*, users.name as username FROM comments
    INNER JOIN posts ON posts.id = post_id
    INNER JOIN users ON users.id = commenter_id
    WHERE post_id = $1
    ORDER BY created_at DESC;`, [postId])
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

  //POST router for adding a new comment onto a post
  router.post("/newcomment", (req, res) => {
    let comment = req.body.comment;
    let userId = req.session.userId;
    let rating = req.body.rating;
    let postid = req.body.postId;
    db.query(`INSERT INTO comments (post_id, commenter_id, rating, comment_body)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, [postid, userId, rating, comment])
      .then(function(data) {
        return db.query(`SELECT comments.*, users.name as username FROM comments
      INNER JOIN posts ON posts.id = post_id
      INNER JOIN users ON users.id = commenter_id
      WHERE comments.id = ${data.rows[0].id};`);
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
  });
};
