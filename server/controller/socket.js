const socket = require('socket.io');
const { verify } = require('jsonwebtoken');
const cookie = require('cookie');
const io = socket(server);
const mails = require('./');
require('dotenv').config();

io.on('connection', (socket) => {
    
    // socket.on('getmails', () => {
    //   verify(
    //     cookie.parse(socket.request.headers.cookie).jwt,
    //     process.env.PRIVATE_KEY,
    //     (err, decoded) => {
    //       if (decoded) {
    //         mails((cb) => {
    //           io.to(socket.id).emit('mails', cb);
    //         });
    //       }
    //     },
    //   );
    // });
    console.log('made socket connection', socket.id);
    io.on('disconnect', () => socket.close());
  