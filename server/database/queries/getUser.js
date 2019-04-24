const connection = require('../connection.js');

const getUser = emailValue => connection.query('SELECT * FROM users WHERE email = $1', [emailValue]);
module.exports = getUser;
