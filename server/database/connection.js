const { Pool } = require('pg');
const url = require('url');
require('dotenv').config();

let DB_URL = '';
if (process.env.NODE_ENV === 'test') DB_URL = process.env.DB_URL_TEST;
else if (process.env.NODE_ENV === 'production') { DB_URL = process.env.DATABASE_URL; } else DB_URL = process.env.DB_URL;

const params = url.parse(DB_URL);
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
