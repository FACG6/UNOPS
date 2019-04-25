const { readFileSync } = require('fs');
const path = require('path');
const connect = require('./connection.js');

const sql = readFileSync(path.join(__dirname, 'build.sql')).toString();

const DBRun = () => connect.query(sql)
  .then(() => console.log('build database was succeful'))
  .catch(error => console.log(error));
module.exports = DBRun;
