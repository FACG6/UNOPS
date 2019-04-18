const { readFileSync } = require('fs');
const path = require('path');
const connect = require('./connection.js');

const error = new TypeError('error in building database');
const sql = readFileSync(path.join(__dirname, 'build.sql')).toString();

const DBRun = () => connect.query(sql);
DBRun().then((result) => {
  if(result) {
    return result;  
  }
}).catch(error);
module.exports = DBRun;
