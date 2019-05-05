const getTickets = require('../database/quiries/getTickets');
const verifyEvent = require('../authentication/verifyCookie');
const nodemailer = require('./nodemailer');
const addNewReply = require('../database/quiries/addreply');
const addTicket = require('../database/quiries/addTicket');

function events(
  socket,
  io,
  triggerGetMailsObj,
  triggerOnNewMail,
  triggerUpdateStatusObj,
  triggerSearchKeyword,
) {
  socket.emit('request getmails');
  socket.on('getmails', (timeRange) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
          getTickets().then((result) => {
            io.to(socket.id).emit('userTickets', result);
          }).catch(error => io.to(socket.id).emit('error', error));
          triggerGetMailsObj(timeRange, (mailObject) => {
            io.to(socket.id).emit('mails', mailObject);
          });
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      })
      .catch(err => io.to(socket.id).emit('error', { error: `verification, ${err}` }));
  });

  socket.on('update status', (statusObj) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
          triggerUpdateStatusObj(statusObj);
          io.to(socket.id).emit('status changed successfully');
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      })
      .catch(err => io.to(socket.id).emit('error', { error: `socket update status ${err}` }));
  });

  socket.on('new ticket', (data) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
          addTicket(data).catch(error => io.to(socket.id).emit('error', error));
          io.to(socket.id).emit('ticket added successfully');
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      })
      .catch(err => io.to(socket.id).emit('error', { error: `new ticket ${err}` }));
  });

  socket.on('send a new message', (data) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
          nodemailer(data).catch(error => io.to(socket.id).emit('error', error));
          addTicket(data).catch(error => io.to(socket.id).emit('error', error));
          io.to(socket.id).emit('ticket added successfully');
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      })
      .catch(err => io.to(socket.id).emit('error', { error: `send a new message ${err}` }));
  });

  socket.on('search', (data) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
          if (data.user) {
            getTickets().then((result) => {
              io.to(socket.id).emit('userTickets', result);
            });
          } else {
            getTickets().then((result) => {
              io.to(socket.id).emit('userTickets', result);
            });
            triggerSearchKeyword(data.keyword, (result) => {
              io.to(socket.id).emit('search result', result);
            });
          }
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      })
      .catch(err => io.to(socket.id).emit('error', { error: `search ${err}` }));
  });

  socket.on('reports', (data) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
          // need a database query here to fetch the statistics..
          io.to(socket.id).emit('status changed successfully', data);
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      })
      .catch(err => io.to(socket.id).emit('error', { error: `reports ${err}` }));
  });

  triggerOnNewMail((mail) => {
    io.to(socket.id).emit('notification');
    socket.on('get new mail', () => {
      verifyEvent(socket)
        .then((res) => {
          if (res) {
            io.to(socket.id).emit('new mail', mail);
          } else io.to(socket.id).emit('error', { error: 'not verified' });
        })
        .catch(err => io.to(socket.id).emit('error', { error: `on new mail ${err}` }));
    });
  });

  console.log('made socket connection', socket.id);
}
module.exports = events;
