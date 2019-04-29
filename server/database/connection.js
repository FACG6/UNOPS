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
const {
  hostname: host, port, pathname, auth,
} = params;
const [user, password] = auth.split(':');

const options = {
  host,
  port,
  user,
  password,
  database: pathname.split('/')[1],
  max: MAX_DB_CONNECTION || 2,
  ssl: hostname !== 'localhost',
};
const pool = new Pool(options);
module.exports = pool;
