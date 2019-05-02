const Imap = require('imap');
const { MailParser } = require('mailparser-mit');
const base64 = require('base64-stream');
const atob = require('atob');
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
        const f = imap.seq.fetch('*', { bodies: '2', struct: true });
        let attribs = {};
        f.on('message', (msg, seqno) => {
          msg.once('attributes', (attrs) => {
            attribs = attrs;
            console.log(attribs.struct);
          });
          const parser = new MailParser();
          msg.on('body', (stream, info) => {
            let buffer = '';
            stream.on('data', (chunk) => {
              buffer += chunk;
            });
            stream.once('end', () => {
              console.log(buffer);
              cb(buffer);
            });
          });
        });
        f.once('error', (downloadErr) => {
          io.to(socket.id).emit('error', `get mails ${downloadErr}`);
        });
        f.once('end', () => {
        });
      };

      const triggerDownloadAttach = (cb) => {
        const toUpper = element => (element && element.toUpperCase ? element.toUpperCase() : element);
        const findAttachmentParts = (struct, attachments) => {
          attachments = attachments || [];
          for (let i = 0; i < struct.length; i++) {
            if (Array.isArray(struct[i])) {
              findAttachmentParts(struct[i], attachments);
            } else if (struct[i].disposition && ['INLINE', 'ATTACHMENT'].indexOf(toUpper(struct[i].disposition.type)) > -1) {
              attachments.push(struct[i]);
            }
          }
          return attachments;
        };
        imap.once('ready', () => {
          imap.openBox('INBOX', true, (err, box) => {
            if (err) throw err;
            const f = imap.fetch(messageUid, {
              bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
              struct: true,
            });
            f.on('message', (msg, seqno) => {
              msg.once('attributes', (attrs) => {
                const attachments = findAttachmentParts(attrs.struct);
                for (let i = 0; i < attachments.length; i++) {
                  const attachment = attachments[i];
                  const f2 = imap.fetch(attrs.uid, {
                    bodies: [attachment.partID],
                    struct: true,
                  });
                  const filename = attachment.params.name;
                  const { encoding } = attachment;
                  f2.on('message', (msg, seqNumber) => {
                    msg.on('body', (stream, info) => {
                      let buffer = '';
                      stream.on('data', (chunk) => {
                        buffer += chunk;
                      });
                      stream.once('end', () => {
                        cb(encoding, filename, extention, buffer);
                      });
                    });
                  });
                }
              });
            });
            f.once('error', (fetchAttachmentErr) => {
              io.to(socket.id).emit('error', `imap update status ${fetchAttachmentErr}`);
            });
          });
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
        triggerDownloadAttach,
      );
    });
  });
  imap.once('error', (err) => {
    io.to(socket.id).emit('error', { error: err });
  });
  imap.connect();
};
module.exports = mails;
