const Imap = require('imap');
const { MailParser } = require('mailparser-mit');
require('dotenv').config();

const imap = new Imap({
  user: process.env.IMAP_USER,
  password: process.env.IMAP_USER_PASS,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
});

const mails = (
  triggerGetMails,
  triggerOnNewMail,
  triggerUpdateStatus,
  triggerSearchKeyword,
  socket,
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
  imap.once('error', (err) => {
    io.to(socket.id).emit('error', { error: err });
  });

  imap.once('end', () => {
    console.log('Connection ended');
  });

  imap.connect();
};
module.exports = mails;
