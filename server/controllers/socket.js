const { verify } = require('jsonwebtoken');
const cookie = require('cookie');
const Imap = require('imap');
const { MailParser } = require('mailparser-mit');
require('dotenv').config();

const events = (socket, io) => {
  const imap = new Imap({
    user: process.env.IMAP_USER,
    password: process.env.IMAP_USER_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  });

  const verifyEvent = () => new Promise(
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

  const mails = (
    triggerGetMails,
    triggerOnNewMail,
    triggerUpdateStatus,
    triggerSearchKeyword,
    getMailsCallback,
  ) => {
    imap.once('ready', () => {
      if (triggerGetMails) {
        imap.openBox('INBOX', true, (err, box) => {
          const f = imap.fetch('1:5', { bodies: '' });
          f.on('message', (msg, seqno) => {
            const parser = new MailParser();
            msg.on('body', (stream, info) => {
              parser.on('end', (mailObject) => {
                getMailsCallback(JSON.stringify(mailObject));
              });
              stream.pipe(parser);
            });
          });
          f.once('error', (Err) => {
            io.to(socket.id).emit('error', { error: Err });
          });
        });
      }
      if (triggerOnNewMail) {
        imap.openBox('INBOX', true, (err, box) => {
          imap.on('mail', (Mails) => {
            const parser = new MailParser();
            const f = imap.seq.fetch('*', {
              bodies: '',
              struct: true,
            });
            f.on('message', (msg, seqno) => {
              msg.on('body', (stream, info) => {
                stream.pipe(parser);
                parser.on('end', (parsedMail) => {
                  getMailsCallback(JSON.stringify(parsedMail));
                });
              });
            });
            f.once('error', (Err) => {
              io.to(socket.id).emit('error', { error: Err });
            });
          });
        });
      }
      if (triggerUpdateStatus) {
        imap.openBox('INBOX', true, (err, box) => {
          if (err) throw err;
          imap.setKeywords(563, [`${triggerUpdateStatus}`]);
        });
      }
      if (triggerSearchKeyword) {
        const parser = new MailParser();
        imap.openBox('INBOX', true, (err, box) => {
          if (err) throw err;
          imap.search([['KEYWORD', `${triggerSearchKeyword}`]], (eror, results) => {
            if (eror) throw eror;
            if (results.length > 0) {
              const f = imap.fetch(results, { bodies: '' });
              f.on('message', (msg, seqno) => {
                msg.on('body', (stream, info) => {
                  parser.on('end', (searchResult) => {
                    getMailsCallback(JSON.stringify(searchResult));
                  });
                  stream.pipe(parser);
                });
              });
              f.once('error', (er) => {
                io.to(socket.id).emit(`Fetch error: ${er}`);
              });
              f.once('end', () => {
                console.log('Done fetching all messages!');
                imap.end();
              });
            }
          });
        });
      }
    });
  };

  mails(false, true, false, false, (mail) => {
    io.to(socket.id).emit('notification');
    socket.on('get new mail', () => {
      verifyEvent()
        .then((res) => {
          if (res) {
            io.to(socket.id).emit('new mail', { mail });
          } else io.to(socket.id).emit('error', { error: 'not verified' });
        }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
    });
  });

  socket.on('getmails', () => {
    verifyEvent()
      .then((res) => {
        if (res) {
          // need a database query here
          // io.to(socket.id).emit('mails', 'database query for tickets fetching');
          mails(true, false, false, false, (mailObject) => {
            io.to(socket.id).emit('mails', mailObject);
          });
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      })
      .catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('update status', (data) => {
    verifyEvent().then((res) => {
      if (res) {
        mails(false, false, data.status, false);
        io.to(socket.id).emit('status changed successfully');
      } else io.to(socket.id).emit('error', { error: 'not verified' });
    }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('new ticket', (data) => {
    verifyEvent()
      .then((res) => {
        if (res) {
        // need a database query here to add the new ticket to the database
          io.to(socket.id).emit('ticket added successfully');
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('send a new message', (data) => {
    verifyEvent()
      .then((res) => {
        if (res) {
        // need a database query here to add the new ticket to the database
          io.to(socket.id).emit('ticket added successfully');
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('search', (data) => {
    verifyEvent()
      .then((res) => {
        if (res) {
          if (data.user) {
          // need a database query here to fetch users tickets
            io.to(socket.id).emit('search tickets', 'query res');
          } else {
          // need a database query here to fetch users tickets
          // example:   io.to(socket.id).emit('mails', 'database  query'); and then =>
            mails(false, false, false, data.searchKeyword, (search) => {
              io.to(socket.id).emit(search);
            });
          }
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
  });

  socket.on('reports', (data) => {
    verifyEvent()
      .then((res) => {
        if (res) {
        // need a database query here to fetch the statistics..
          io.to(socket.id).emit('status changed successfully', data);
        } else io.to(socket.id).emit('error', { error: 'not verified' });
      }).catch(err => io.to(socket.id).emit('error', { error: `${err}` }));
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
