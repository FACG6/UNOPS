BEGIN;

    DROP TABLE IF EXISTS users, tickets_status, tickets
    CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL ,
    password VARCHAR NOT NULL
);

CREATE TABLE tickets
(
    uid INTEGER PRIMARY KEY,
    sent_by VARCHAR NOT NULL,
    delivered_to VARCHAR NOT NULL,
    date_time TIMESTAMP NOT NULL,
    body VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

COMMIT;
