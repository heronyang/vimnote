/*
Run:
    $ psql postgres -U vimnote_server < db_init.sql
*/
DROP DATABASE IF EXISTS vimnote;

CREATE DATABASE vimnote;
\c vimnote;

CREATE TABLE doc (
  id CHAR(10) PRIMARY KEY,
  title VARCHAR(255),
  content TEXT
);
