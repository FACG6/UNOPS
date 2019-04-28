const { sign, verify } = require('jsonwebtoken');
const cookie = require('cookie');
const socket = require('socket.io');
const server = require('./../index');
const io = socket(server);
require('dotenv').config();

io.on('connection', (socket) => {
  console.log('socket connection');
  socket.on('getmails', () => {
    verify(
      cookie.parse(socket.request.headers.cookie).jwt,
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        if (decoded) {
          mails((cb) => {
            io.to(socket.id).emit('mails', cb);
          });
        }
      },
    );
  });
  console.log('made socket connection', socket.id);
  io.on('disconnect', () => socket.close());
});
