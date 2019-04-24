const { Pool } = require('pg');
const url = require('url');
require('dotenv').config();

const dbUrl = process.env.DB_URL;
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
