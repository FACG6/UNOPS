BEGIN;
DROP TABLE IF EXISTS users, tickets_status, tickets CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL ,
    password VARCHAR NOT NULL
);
CREATE TABLE tickets_status(
    uid SERIAL PRIMARY KEY,
    status VARCHAR NOT NULL
);
CREATE TABLE tickets(
    uid SERIAL PRIMARY KEY,
    from_email VARCHAR NOT NULL,
    to_email VARCHAR NOT NULL,
    date_email TIMESTAMP ,
    body VARCHAR NOT NULL,
    status  VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    user_id INTEGER REFERENCES users(id)
);
COMMIT;
