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

module.exports = verifyEvent;
