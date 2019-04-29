const { readFile } = require('fs');
const { join } = require('path');
const { query } = require('./connection.js');

const dbRun = () => new Promise((resolve, reject) => {
  readFile(join(__dirname, 'build.sql'), (fileError, sql) => {
    if (fileError) reject(fileError);
    query(sql)
      .then(() => {
        console.log('Database was built successfully');
        resolve(true);
      })
      .catch(queryError => reject(queryError));
  });
});

dbRun();

module.exports = dbRun;
