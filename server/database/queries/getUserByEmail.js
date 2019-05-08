const connection = require('../connection');

module.exports = email => connection.query('SELECT * FROM users WHERE users.email = 1$', [email]).then(res => res.rows);
