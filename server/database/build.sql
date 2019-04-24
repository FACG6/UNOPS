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
    from_tickets VARCHAR NOT NULL,
    to_tickets VARCHAR NOT NULL,
    date INTEGER ,
    body VARCHAR NOT NULL,
    status  VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    user_id INTEGER REFERENCES users(id)
);
INSERT INTO users (email,name,password) VALUES ('alaabadra4@gmail.com','Alaa','$2a$05$F8cd.whbSGfpaLbIiVmtDe04N0e8bYU5zw6L3dndWiHbOW4MAFSjK'); 

COMMIT;

