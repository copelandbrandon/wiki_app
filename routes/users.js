const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //POST router for favouriting/liking a post
  router.post("/liked", (req, res) => {
    let postId = req.body.postId;
    let user = req.session.userId;
    db.query(`
    SELECT * FROM favourites WHERE post_id = ${postId} AND viewer_id = ${user};`)
      .then(function(data) {
        if (data.rows.length < 1) {
          db.query(`INSERT INTO favourites (post_id, viewer_id)
        VALUES (${postId}, ${user});`)
            .then(function() {
              db.query(`SELECT COUNT(favourites.*) as num_favs, posts.id, posts.title FROM favourites INNER JOIN posts ON posts.id = post_id WHERE posts.id = $1 GROUP BY posts.id;`, [postId])
                .then(function(data) {
                  const counter = data.rows[0];
                  res.json({ counter });
                });
            });
        } else {
          db.query(`DELETE FROM favourites WHERE post_id = ${postId} AND viewer_id = ${user};`)
            .then(function() {
              db.query(`SELECT COUNT(favourites.*) as num_favs, posts.id, posts.title FROM favourites INNER JOIN posts ON posts.id = post_id WHERE posts.id = $1 GROUP BY posts.id;`, [postId])
                .then(function(data) {
                  let counter = data.rows[0];
                  if (data.rows[0] === undefined) {
                    console.log('reached delete in favourites counter');
                    counter = 0;
                    res.json({ counter });
                  } else {
                    console.log('data in delete',data.rows[0]);
                    res.json({ counter });
                  }
                });
            });
        }
      });
  });

  //POST router for updating users display name
  router.post("/update-name", (req, res) => {
    const newName = req.body.newName;
    const userId = req.session.userId;
    db.query(`
    UPDATE users SET name = '${newName}' WHERE id = ${userId};
    `).then(function(newName) {
      res.json({newName});
    });
  });

  return router;
};