DROP DATABASE IF EXISTS wzrd;

CREATE DATABASE wzrd
  OWNER = postgres
  ENCODING = 'UTF8'
  CONNECTION LIMIT = 25;

\c wzrd;

CREATE TABLE users (
  id serial NOT NULL,
  username VARCHAR,
  password VARCHAR,
  email VARCHAR
  -- urls ARRAY -- foreign key array
);

INSERT INTO users (username, password, email) VALUES ('anon', '2ae66f90b7788ab8950e8f81b829c947', 'anon');
CREATE TABLE urls (
  id serial NOT NULL,
  owner VARCHAR, -- foriegn key
  originalurl VARCHAR,
  shorturl VARCHAR,
  urlnickname VARCHAR
);