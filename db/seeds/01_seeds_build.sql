-- Users table seeds here
INSERT INTO users (name, email, password) VALUES ('Alice', 'aCarrero@gmail.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Kira', 'kGimble@rocketmail.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Charles', 'charlesG@hotmail.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Ned', 'nedwardCullen@shaw.ca', 'password');
INSERT INTO users (name, email, password) Values ('Tommy', 'Tdizzle@gmail.com', 'password');

INSERT INTO users (name, email, password) Values ('Vlad', 'theImpaler@gmail.com', 'password');
INSERT INTO users (name, email, password) Values ('Sam', 'sworn2carryurburdens@live.com', 'password');
INSERT INTO users (name, email, password) Values ('Frodo', 'ringbearer42@shiremail.com', 'password');
INSERT INTO users (name, email, password) Values ('Jeanine', 'jeanqueen@hotmail.com', 'password');
INSERT INTO users (name, email, password) Values ('Carlie', 'carlieSimone@gmail.com', 'password');

--Types table seeds here
INSERT INTO types (name) VALUES ('Video');
INSERT INTO types (name) VALUES ('Article');
INSERT INTO types (name) VALUES ('Quiz');
INSERT INTO types (name) VALUES ('Blog');
INSERT INTO types (name) VALUES ('Documentation');
INSERT INTO types (name) VALUES ('Resource Hub');
--INSERT INTO types (name) VALUES ('Podcast);

--Favourites table seeds here
INSERT INTO favourites (post_id, viewer_id) VALUES (1, 10);
INSERT INTO favourites (post_id, viewer_id) VALUES (1, 7);
INSERT INTO favourites (post_id, viewer_id) VALUES (3, 9);
INSERT INTO favourites (post_id, viewer_id) VALUES (2, 6);
INSERT INTO favourites (post_id, viewer_id) VALUES (5, 1);

INSERT INTO favourites (post_id, viewer_id) VALUES (6, 5);
INSERT INTO favourites (post_id, viewer_id) VALUES (8, 1);
INSERT INTO favourites (post_id, viewer_id) VALUES (9, 8);
INSERT INTO favourites (post_id, viewer_id) VALUES (5, 5);
INSERT INTO favourites (post_id, viewer_id) VALUES (4, 1);

--Posts table seeds here
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.hackerrank.com/dashboard', 'HackerRank', 'description', 1, 6, 'Coding basics');
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://developer.mozilla.org/en-US/', 'MDN', 'description', 2, 5, 'Coding basics');
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://nodejs.org/en/docs/', 'Node Documentation', 'description', 3, 5, 'Node');
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.postgresql.org/docs/', 'Postgres Docs', 'description', 4, 5, 'Postgresql');
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('http://expressjs.com/en/api.html', 'express API', 'description', 1, 5, 'Express');

INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.hackerrank.com/dashboard', 'HackerRank', 'description', 2, 6, 'JS fundamentals');
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.hackerrank.com/dashboard', 'The Dash', 'description', 3, 6, 'Javascript');
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.khanacademy.org/', 'Khan Academy', 'description', 4, 6, 'Overall Learning');
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.khanacademy.org/humanities/art-history', 'Art History with Khan Academy', 'description', 7, 6, 'Art History');
INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
VALUES ('https://www.khanacademy.org/science/ap-college-environmental-science', 'Env Science with Khan Academy', 'description', 9, 6, 'Science');

--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://www.youtube.com/watch?v=b4b8ktEV4Bg', 'Hashing algorithms', 'description', 1, 1, 'Web security');
--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://web-design-weekly.com/viewport-units-vw-vh-vmin-vmax/', 'Web Design', 'description', 4, 2, 'Viewport Units');
--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://elearningindustry.com/', 'Elearning Industry', 'description', 3, 4, 'general learning');
--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://www.theedublogger.com/prompts-student-writing/', 'Blog Publishing Tips', 'description', 5, 4, 'Writing prompts');
--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://www.britannica.com/quiz/parts-of-a-cell', 'Parts of a cell', 'description', 7, 3, 'Biology');

--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://www.nature.com/articles/d41586-021-01441-w', 'Livestock Vaccination', 'description', 8, 7, 'Farming');
--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://www.youtube.com/watch?v=Y0HfmYBlF8g&t=12s', 'Making Aerogel', 'description', 6, 1, 'Chemistry');
--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://www.tomakemuchoftime.com/blog/scotland-accommodations?gclid=CjwKCAjwtdeFBhBAEiwAKOIy5zTft_Ay_GN3dUVp7D8azaPFqBL_0CBYCxkcxvW9s_Xnwx7yypXEoxoCl4QQAvD_BwE', 'Scotlands Accomodations', 'description', 7, 4, 'Travel');
--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://codingislove.com/generate-link-preview-webapp/', 'Generating link previews', 'description', 5, 2, 'Coding HTML');
--INSERT INTO posts (url, title, description, poster_id, resource_type_id, topic)
--VALUES ('https://www.quantamagazine.org/black-hot-superionic-ice-may-be-natures-most-common-form-of-water-20190508/', 'Super-Ionic Ice', 'description', 7, 2, 'Science');

--Comments table seeds here
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (1, 7, 5, 'Woah I love this!');
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (1, 9, 3, 'Meh...');
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (1, 8, 3, 'This is okay, but I disagree');
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (8, 1, 1, 'I did not find this helpful!');
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (9, 1, 5, 'Thanks for sharing!');

INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (3, 5, 4, 'There were some spelling mistakes...');
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (9, 4, 5, 'Saving for later.');
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (4, 7, 2, 'I found a better resource here (url)');
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (6, 6, 1, 'I cant even read this!');
INSERT INTO comments (post_id, commenter_id, rating, comment_body)
VALUES (5, 3, 3, 'Nice');
