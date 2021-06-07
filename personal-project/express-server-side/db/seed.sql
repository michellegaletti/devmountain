-- One to Many relationship
DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(2000)
);

CREATE TABLE genre (
  genre_id SERIAL PRIMARY KEY,
  genre_name VARCHAR(2000)
);

CREATE TABLE entries (
  entry_id SERIAL PRIMARY KEY,
  restaurant_name VARCHAR(500),
  entry_date VARCHAR(1000),
  entry_meal VARCHAR (2000),
  entry_alcohol VARCHAR(1000),
  bathroom_experience INT,
  customer_experience INT,
  other VARCHAR(2000),
  user_id INT REFERENCES users(user_id),
  genre_id INT REFERENCES genre(genre_id)
);
