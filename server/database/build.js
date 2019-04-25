const { readFileSync } = require('fs');
const path = require('path');
const connect = require('./connection.js');


const sql = readFileSync(path.join(__dirname, 'build.sql')).toString();

const DBRun = () => connect.query(sql).then((result) => {
  if (result) return console.log('built database successfuly');
}).catch(error => console.log('error in built database'));

module.exports = DBRun;
