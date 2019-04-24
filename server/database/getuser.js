const connect = require('./connection');

const getuser = (email) => {
  const sql = {
    text: 'SELECT * FROM users WHERE email=$1',
    values: [email],
  };
  return connect.query(sql);
};
module.exports = { getuser };
