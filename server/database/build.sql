BEGIN;

    DROP TABLE IF EXISTS users, tickets
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
    id SERIAl PRIMARY KEY,
    sentby TEXT,
    deliveredto TEXT NOT NULL,
    bcc TEXT,
    dattime TIMESTAMP,
    body TEXT NOT NULL,
    statusticket TEXT NOT NULL,
    subjectticket TEXT NOT NULL,
    userid INTEGER REFERENCES users(id),
    reply BOOLEAN NOT NULL
);

COMMIT;
