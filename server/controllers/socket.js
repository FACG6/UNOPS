const mails = require('./Imap-connection');
const verifyEvent = require('../authentication/verifyCookie');

const events = (socket, io) => {
  mails(false, true, false, false, socket, (mail) => {
    io.to(socket.id).emit('notification');
    socket.on('get new mail', () => {
      verifyEvent(socket)
        .then((res) => {
          if (res) {
            io.to(socket.id).emit('new mail', { mail });
          } else io.to(socket.id).emit('error', { error: 'not verified' });
        }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
    });
  });

  socket.on('getmails', () => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
          // need a database query here
          // io.to(socket.id).emit('mails', 'database query for tickets fetching');
          mails(true, false, false, false, socket, (mailObject) => {
            io.to(socket.id).emit('mails', mailObject);
          });
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      })
      .catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('update status', (data) => {
    verifyEvent(socket).then((res) => {
      if (res) {
        mails(false, false, data.status, false, socket);
        io.to(socket.id).emit('status changed successfully');
      } else io.to(socket.id).emit('error', { error: 'not verified' });
    }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('new ticket', (data) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
        // need a database query here to add the new ticket to the database
          io.to(socket.id).emit('ticket added successfully');
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('send a new message', (data) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
        // need a database query here to add the new ticket to the database
          io.to(socket.id).emit('ticket added successfully');
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('search', (data) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
          if (data.user) {
          // need a database query here to fetch users tickets
            io.to(socket.id).emit('search tickets', 'query res');
          } else {
          // need a database query here to fetch users tickets
          // example:   io.to(socket.id).emit('mails', 'database  query'); and then =>
            mails(false, false, false, data.searchKeyword, socket, (search) => {
              io.to(socket.id).emit(search);
            });
          }
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('reports', (data) => {
    verifyEvent(socket)
      .then((res) => {
        if (res) {
        // need a database query here to fetch the statistics..
          io.to(socket.id).emit('status changed successfully', data);
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  console.log('made socket connection', socket.id);
};
module.exports = events;
