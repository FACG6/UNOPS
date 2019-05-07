const { verify } = require('jsonwebtoken');
const cookie = require('cookie');

const verifyEvent = socket => new Promise(
  (resolve, reject) => {
    verify(
      cookie.parse(socket.request.headers.cookie).jwt,
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      },
    );
  },
);

const verifyAuthority = (req, res, next) => {
  verify(
    req.cookies.jwt,
    process.env.PRIVATE_KEY,
    (err, decoded) => {
      if (err) res.status(500).send('Internal server error.');
      else req.cookies.jwt = decoded;
      next();
    },
  );
};

module.exports = { verifyEvent, verifyAuthority };
