const jwt = require('jsonwebtoken');

const genToken = userInfo => new Promise((resolve, reject) => {
  jwt.sign(userInfo, process.env.SECRET, (error, token) => {
    if (error) reject(error);
    else resolve(token);
  });
});
module.exports = genToken;
