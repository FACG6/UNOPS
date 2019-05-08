BEGIN;

    DROP TABLE IF EXISTS users, tickets ,replies
    CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
   user_name VARCHAR NOT NULL ,
    user_password VARCHAR NOT NULL
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
    userid INTEGER REFERENCES users(id)
);

CREATE TABLE replies
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
    inReplyTo TEXT NOT NUll
);
COMMIT;
