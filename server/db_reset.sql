/*
Run:
    $ psql postgres < db_reset.sql
*/
DROP DATABASE IF EXISTS vimnote;
DROP ROLE IF EXISTS vimnote_server;

CREATE ROLE vimnote_server WITH LOGIN PASSWORD '1234';
ALTER ROLE vimnote_server CREATEDB;

