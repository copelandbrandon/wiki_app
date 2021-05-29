DROP TABLE favourites IF EXISTS CASCADE;

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  viewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  CONSTRAINT unique_favourite UNIQUE (viewer_id/post_id)
);