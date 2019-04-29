const { sign } = require('jsonwebtoken');
require('dotenv').config();

exports.assignCookie = (req, res, next) => {
  console.log('fghgfhfghfhfghfghfhfgh');
  const jwt = sign('socket', process.env.PRIVATE_KEY);
  res.cookie('jwt', jwt);
  res.send();
};
