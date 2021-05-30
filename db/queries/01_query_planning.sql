-- USER QUERIES

--    GET
--    need to get users name to display on nav bar
--    STRETCH will need to check email and password against database for login/ register

SELECT name FROM users WHERE name = $1;

--    POST
--    STRETCH need to insert new user into table

-- POST QUERIES

--    GET
--    will need to get all post information for multiple posts + usernames of people who posted
--    will need to get all post information for single post + username of person who posted
--    will need to get all posts filtered by topic / title

SELECT posts.*, users.name, types.* FROM posts INNER JOIN users ON users.id = poster_id INNER JOIN types ON resource_type_id = types.id;

SELECT posts.*, users.name, comments.*, types.* FROM posts INNER JOIN users ON users.id = poster_id INNER JOIN comments ON posts.id = post_id INNER JOIN types ON resource_type_id = types.id WHERE post_id = 5;

SELECT posts.*, users.name, types.* FROM posts INNER JOIN users ON users.id = poster_id INNER JOIN types ON resource_type_id = types.id WHERE title LIKE '%MDN%'; -- WHERE topic LIKE '%$1%' AND title LIKE '%$2%'

--    POST
--    will need to insert new post into posts table

INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.hackerrank.com/dashboard', 'HackerRank', 'description', 1, 6, 'Coding basics');

-- FAVOURITE QUERIES

--    GET
--    will need to get all posts favourited by user

SELECT posts.*, favourites.*, users.name, types.* FROM posts INNER JOIN favourites ON posts.id = post_id INNER JOIN users ON users.id = viewer_id INNER JOIN types ON resource_type_id = types.id WHERE users.id = $1;

--    POST 
--    will need to insert new favourite into favourites

INSERT INTO favourites (post_id, viewer_id) VALUES ($1, $2);

-- TYPE QUERIES

--    GET
--    will need to get posts filtered by type
SELECT posts.*, users.name, types.* FROM posts INNER JOIN types ON resource_type_id = types.id INNER JOIN users ON users.id = poster_id WHERE types.name = $1;

-- COMMENT QUERIES

--    GET
--    will need to get all comments for a single post

-- REFERENCE POSTS FOR QUERY

--    POST
--    will need to insert new comment into table

INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES ($1, $2, $3, $4);