DROP DATABASE IF EXISTS wzrd;

CREATE DATABASE wzrd
  OWNER = postgres
  ENCODING = 'UTF8'
  CONNECTION LIMIT = 25;

\c wzrd;

CREATE TABLE users (
  id serial NOT NULL,
  username VARCHAR, -- should have client validation
  password VARCHAR -- should be hashed and have validiation on the front end
--   urls ARRAY -- foreign key array
);

CREATE TABLE urls (
  id serial NOT NULL,
  owner VARCHAR, -- foriegn key
  originalurl VARCHAR,
  shorturl VARCHAR,
  urlnickname VARCHAR
);