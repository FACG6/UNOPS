const { verify } = require('jsonwebtoken');
const cookie = require('cookie');
const Imap = require('imap');
const { MailParser } = require('mailparser-mit');
require('dotenv').config();
require('dotenv').config();

const events = (socket, io) => {
  const imap = new Imap({
    user: process.env.IMAP_USER,
    password: process.env.IMAP_USER_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  });

  const verifyEvent = (cb) => {
    verify(
      cookie.parse(socket.request.headers.cookie).jwt,
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        cb(err, decoded);
      },
    );
  };

  const mails = (callback) => {
    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err, box) => {
        const f = imap.fetch('1:5', { bodies: '' });
        f.on('message', (msg, seqno) => {
          const parser = new MailParser();
          msg.on('body', (stream, info) => {
            parser.on('end', (mailObject) => {
              callback(JSON.stringify(mailObject));
            });
            stream.pipe(parser);
          });
        });
        f.once('error', (Err) => {
          io.to(socket.id).emit('error', { error: Err });
        });
      });
    });
  };

  socket.on('getmails', () => {
    verifyEvent((err, decoded) => {
      if (decoded) {
        // need a database query here
        // io.to(socket.id).emit('mails', 'database query for tickets fetching');
        mails((mailObject) => {
          io.to(socket.id).emit('mails', mailObject);
        });
      } else io.to(socket.id).emit('error', { error: 'not verified' });
    });
  });

  socket.on('update status', (data) => {
    verifyEvent((err, decoded) => {
      if (decoded) {
        imap.setKeywords(data.uid, [`${data.status}`]);
        io.to(socket.id).emit('status changed successfully');
      } else io.to(socket.id).emit('error', { error: 'not verified' });
    });
  });

  socket.on('new ticket', (data) => {
    verifyEvent((err, decoded) => {
      if (decoded) {
        // need a database query here to add the new ticket to the database
        io.to(socket.id).emit('ticket added successfully');
      } else io.to(socket.id).emit('error', { error: 'not verified' });
    });
  });

  socket.on('send a new message', (data) => {
    verifyEvent((err, decoded) => {
      if (decoded) {
        // need a database query here to add the new ticket to the database
        io.to(socket.id).emit('ticket added successfully');
      } else io.to(socket.id).emit('error', { error: 'not verified' });
    });
  });

  socket.on('search', (data) => {
    verifyEvent((err, decoded) => {
      if (decoded) {
        if (data.user) {
          // need a database query here to fetch users tickets
          io.to(socket.id).emit('search tickets', 'query res');
        } else {
          // need a database query here to fetch users tickets
          // example:   io.to(socket.id).emit('mails', 'database  query'); and then =>
          const parser = new MailParser();
          imap.search([`${data.status}`], (err, results) => {
            if (err) throw err;
            const f = imap.fetch(results, { bodies: '' });
            f.on('message', (msg, seqno) => {
              msg.on('body', (stream, info) => {
                parser.on('end', (x) => {
                  io.to(socket.id).emit(JSON.stringify(x));
                });
                stream.pipe(parser);
              });
            });
            f.once('error', (err) => {
              io.to(socket.id).emit(`Fetch error: ${err}`);
            });
            f.once('end', () => {
              console.log('Done fetching all messages!');
              imap.end();
            });
          });
        }
      } else io.to(socket.id).emit('error', { error: 'not verified' });
    });
  });

  socket.on('reports', (data) => {
    verifyEvent((err, decoded) => {
      if (decoded) {
        // need a database query here to fetch the statistics..
        io.to(socket.id).emit('status changed successfully', data);
      } else io.to(socket.id).emit('error', { error: 'not verified' });
    });
  });

  imap.on('mail', (mails) => {
    const parser = new MailParser();
    const f = imap.seq.fetch('*', {
      bodies: [],
      struct: true,
    });
    f.on('message', (msg, seqno) => {
      msg.on('body', (stream, info) => {
        parser.on('end', (x) => {
          io.to(socket.id).emit('mails', JSON.stringify(x));
        });
        stream.pipe(parser);
      });
    });
  });

  imap.once('error', (err) => {
    io.to(socket.id).emit('error', { error: err });
  });

  imap.once('end', () => {
    console.log('Connection ended');
  });

  imap.connect();
  console.log('made socket connection', socket.id);
};
module.exports = events;
