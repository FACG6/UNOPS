const socket = require('socket.io');
const { verify } = require('jsonwebtoken');
const cookie = require('cookie');
const Imap = require('imap');
const { MailParser } = require('mailparser-mit');
const express = require('express');

const app = express();
const server = app.listen(7425, () => {
  console.log('listening on port 7425');
});

const io = socket(server);
require('dotenv').config();

io.on('connection', (socket) => {
  const imap = new Imap({
    user: '',
    password: '',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  });
  const openInbox = (cb) => {
    imap.openBox('INBOX', true, cb);
  };
  const mails = (callback) => {
    imap.once('ready', () => {
      openInbox((err, box) => {
        const f = imap.fetch('1:5', { bodies: '' });
        f.on('message', (msg, seqno) => {
          const parser = new MailParser();
          msg.on('body', (stream, info) => {
            parser.on('end', (x) => {
              console.log(x);
              callback(JSON.stringify(x));
            });
            stream.pipe(parser);
          });
        });
        f.once('error', (err) => {
          console.log('fetch error');
        });
      });
    });
  };

  socket.on('getmails', () => {
    verify(
      cookie.parse(socket.request.headers.cookie).jwt,
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        if (decoded) {
          // need a database query here
          io.to(socket.id).emit('mails', 'database query for tickets fetching');
          mails((cb) => {
            io.to(socket.id).emit('mails', cb);
          });
        }
      },
    );
  });

  socket.on('update status', (data) => {
    verify(
      cookie.parse(socket.request.headers.cookie).jwt,
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        if (decoded) {
          imap.setKeywords(data.uid, [`${data.status}`]);
          io.to(socket.id).emit('status changed successfully');
        }
      },
    );
  });

  socket.on('new ticket', (data) => {
    verify(
      cookie.parse(socket.request.headers.cookie).jwt,
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        if (decoded) {
          // database query
          io.to(socket.id).emit('ticket added successfully');
        }
      },
    );
  });


  socket.on('search', (data) => {
    verify(
      cookie.parse(socket.request.headers.cookie).jwt,
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        if (decoded) {
          if (data.user) {
            // database query
            io.to(socket.id).emit('search tickets', 'query res');
          } else {
            // need a database query
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
                console.log(`Fetch error: ${err}`);
              });
              f.once('end', () => {
                console.log('Done fetching all messages!');
                imap.end();
              });
            });
          }
        }
      },
    );
  });

  socket.on('reports', (data) => {
    verify(
      cookie.parse(socket.request.headers.cookie).jwt,
      process.env.PRIVATE_KEY,
      (err, decoded) => {
        if (decoded) {
          // need a database query here..
          io.to(socket.id).emit('status changed successfully', data);
        }
      },
    );
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
    console.log(err);
  });
  imap.once('end', () => {
    console.log('Connection ended');
  });
  imap.connect();
  console.log('made socket connection', socket.id);
  io.on('disconnect', () => socket.close());
});
