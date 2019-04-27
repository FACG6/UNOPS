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

CREATE TABLE tickets_status
(
    uid SERIAL PRIMARY KEY,
    status VARCHAR NOT NULL
);

CREATE TABLE tickets
(
    uid INTEGER PRIMARY KEY,
    from_tickets VARCHAR NOT NULL,
    to_tickets VARCHAR NOT NULL,
    date_time TIMESTAMP NOT NULL,
    body VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

COMMIT;
