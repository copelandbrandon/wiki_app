ALTER USER labber WITH SUPERUSER;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS types CASCADE;

CREATE TABLE types (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  url TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),--Can be null
  poster_id INTEGER REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  resource_type_id INTEGER REFERENCES types(id) ON DELETE CASCADE NOT NULL,
  topic VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  viewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  CONSTRAINT unique_favourite UNIQUE (viewer_id, post_id)
);

DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  commenter_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  rating SMALLINT NOT NULL,
  comment_body VARCHAR(128)--Can be null
);