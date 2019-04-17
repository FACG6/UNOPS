const { Pool } = require('pg');
const url = require('url');
require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;
const allInfoConn = url.parse(DB_URL);
const [user, password] = allInfoConn.auth.split(':');
const someInfoConn = {
  host: allInfoConn.hostname,
  port: allInfoConn.port,
  database: allInfoConn.pathname.split('/')[1],
  max: process.env.MAX_DB_CONNECTION || 2,
  user,
  password,
  ssl: process.env.hostname !== 'localhost',
};
module.exports = new Pool(someInfoConn);

