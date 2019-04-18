const { Pool } = require('pg');
const url = require('url');
require('dotenv').config();

let dbUrl = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'dbtest' || process.env.NODE_ENV === 'test') {
  dbUrl = process.env.DATABASE_URLTEST;
}
const params = url.parse(dbUrl);
const [user, password] = params.auth.split(':');
const option = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.MAX_DB_CONNECTION || 2,
  user,
  password,
  ssl: process.env.hostname !== 'localhost',
};

module.exports = new Pool(option);

