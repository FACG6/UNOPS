const connection = require('../connection');

module.exports = (email, name, password) => connection.query('INSERT INTO USERS (email, name, password) VALUES ($1,$2,$3)', [email, name, password]);
