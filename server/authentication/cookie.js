const { sign } = require('jsonwebtoken');
require('dotenv').config();

exports.assignCookie = (req, res, name) => {
  const jwt = sign(name, process.env.PRIVATE_KEY);
  res.cookie('jwt', jwt, { maxAge: 1000 * 60 * 60 * 24 * 1 }, { httpOnly: true });
  res.redirect('/tickets/all-tickets');
};
