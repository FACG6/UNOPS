const express = require('express');
const socket = require('socket.io');
const cokie = require('cookie');
const { verify } = require('jsonwebtoken');
const mails = require('./imap');

const app = express();
const server = app.listen(7425, () => {
  console.log('listening on port 7425');
});
const io = socket(server);
app.use(express.static('public'));
io.on('connection', (socket) => {
  socket.on('getmails', () => {
    verify(
      cokie.parse(socket.request.headers.cookie).jwt,
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
