const { Pool } = require('pg');
const { parse } = require('url');
require('dotenv').config();

let { DATABASE_URL: dbUrl } = process.env;
const {
  MAX_DB_CONNECTION, NODE_ENV, hostname, DATABASE_URLTEST,
} = process.env;

if (NODE_ENV === 'dbtest' || NODE_ENV === 'test') {
  dbUrl = DATABASE_URLTEST;
}

const params = parse(dbUrl);
const [user, password] = params.auth.split(':');
const { hostname: host, port, pathname } = params;

const options = {
  host,
  port,
  database: pathname.split('/')[1],
  max: MAX_DB_CONNECTION || 2,
  user,
  password,
  ssl: hostname !== 'localhost',
};

module.exports = new Pool(options);
