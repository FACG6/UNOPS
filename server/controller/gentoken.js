const { sign } = require('jsonwebtoken');

const gencookie = payload => new Promise((resolve, reject) => {
  sign(payload, process.env.SECRET, (error, token) => {
    if (error) reject(error);
    else resolve(token);
  });
});

module.exports = gencookie;
