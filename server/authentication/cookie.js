const { sign } = require('jsonwebtoken');
require('dotenv').config();

exports.assignCookie = (req, res, next) => {
  const jwt = sign('socket', process.env.PRIVATE_KEY);
  res.cookie('jwt', jwt);
  res.send();
};
