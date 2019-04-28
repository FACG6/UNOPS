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
          // io.to(socket.id).emit('mails', 'database query for tickets fetching');
          mails((mailObject) => {
            io.to(socket.id).emit('mails');
          });
        } else console.log('not verified');
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
};
module.exports = events;
