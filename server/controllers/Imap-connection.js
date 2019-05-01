const Imap = require('imap');
const { MailParser } = require('mailparser-mit');
const events = require('../controllers/socket');
require('dotenv').config();


const mails = (
  socket,
  io,
) => {
  const imap = new Imap({
    user: process.env.IMAP_USER,
    password: process.env.IMAP_USER_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  });

  imap.once('ready', () => {
    imap.openBox('INBOX', false, (err, box) => {
      const triggerGetMailsObj = (range, cb) => {
        const f = imap.seq.fetch(range, { bodies: '' });
        f.on('message', (msg, seqno) => {
          const parser = new MailParser();
          msg.on('body', (stream, info) => {
            parser.on('end', (mailObject) => {
              cb(JSON.stringify(mailObject));
            });
            stream.pipe(parser);
          });
        });
        f.once('error', (Err) => {
          io.to(socket.id).emit('error', `get mails ${Err}`);
        });
        f.once('end', () => {
        });
      };
      const triggerOnNewMail = (cb) => {
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
                cb(JSON.stringify(parsedMail));
              });
            });
          });
          f.once('error', (Err) => {
            io.to(socket.id).emit('error', `on new mail, ${Err}`);
          });
          f.once('end', () => {
          });
        });
      };

      const triggerUpdateStatusObj = (trigUpdateStatusObj) => {
        if (err) io.to(socket.id).emit('error', err);
        imap.setKeywords(
          trigUpdateStatusObj.uid,
          [`${trigUpdateStatusObj.status}`],
          er => io.to(socket.id).emit('error', `imap update status ${er}`),
        );
      };

      const triggerSearchKeyword = (trigSearchKeyword, cb) => {
        const parser = new MailParser();
        io.to(socket.id).emit('error', err);
        imap.search([['KEYWORD', `${trigSearchKeyword}`]],
          (eror, results) => {
            if (eror) { io.to(socket.id).emit('error', `search, ${eror}`); }
            if (results.length > 0) {
              const f = imap.fetch(
                results,
                { bodies: '' },
              );
              f.on('message', (msg, seqno) => {
                msg.on('body', (stream, info) => {
                  parser.on('end', (searchResult) => {
                    cb(JSON.stringify(searchResult));
                  });
                  stream.pipe(parser);
                });
              });
              f.once('error', (er) => {
                io.to(socket.id).emit('error', `search, ${er}`);
              });
              f.once('end', () => {
              });
            }
          });
      };
      events(
        socket,
        io,
        triggerGetMailsObj,
        triggerOnNewMail,
        triggerUpdateStatusObj,
        triggerSearchKeyword,
      );
    });
  });
  imap.once('error', (err) => {
    io.to(socket.id).emit('error', { error: err });
  });
  imap.connect();
};
module.exports = mails;
