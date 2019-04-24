const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const gencookie = payload => new Promise((resolve, reject) => {
  sign(payload, 'jamalat', (error, token) => {
    if (error) reject(error);
    else resolve(token);
  });
});
module.exports = gencookie;
