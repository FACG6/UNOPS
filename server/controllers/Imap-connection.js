const Imap = require('imap');
const { MailParser } = require('mailparser-mit');
const events = require('../controllers/socket');
require('dotenv').config();

const mails = (socket, io) => {
  const imap = new Imap({
    user: process.env.IMAP_USER,
    password: process.env.IMAP_USER_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  });
  const replies = [];
  imap.once('ready', () => {
    imap.openBox('INBOX', false, (err, box) => {
      const triggerGetMailsObj = (timeRange, cb) => {
        imap.search(
          [['SINCE', `${timeRange.Since}`], ['BEFORE', timeRange.Before]],
          (er, results) => {
            if (er) io.to(socket.id).emit('error', err);
            try {
              const f = imap.fetch(results, { bodies: '' });
              let attribs = {};
              let mailobj = {};
              f.on('message', (msg, seqno) => {
                const parser = new MailParser();
                msg.on('body', async (stream, info) => {
                  attribs = await new Promise(resolve => msg.once('attributes', (attrs) => {
                    resolve(attrs);
                  }));
                  parser.on('end', (mailObject) => {
                    mailobj = mailObject;
                    const data = { attribs, mailobj };
                    if (!mailObject.headers['in-reply-to']) {
                      mailobj = mailObject;
                      const data = { attribs, mailobj };
                      cb(JSON.stringify(data));
                    } else {
                      replies.push(data);
                    }
                  });
                  stream.pipe(parser);
                });
              });
              f.once('error', (getMailsErr) => {
                io.to(socket.id).emit('error', `get mails ${getMailsErr}`);
              });
            } catch (e) {
              io.to(socket.id).emit('error', 'get mails error, ((date)) , nothing to fitch');
            }
          },
        );
      };
      const triggerOnNewMail = (cb) => {
        imap.on('mail', () => {
          const f = imap.seq.fetch('*', {
            bodies: '',
            struct: true,
          });
          let attribs = {};
          let mailobj = {};
          f.on('message', (msg) => {
            const parser = new MailParser();
            msg.once('attributes', (attrs) => {
              attribs = attrs;
            });
            msg.on('body', async (stream) => {
              attribs = await new Promise(resolve => msg.once('attributes', (attrs) => {
                resolve(attrs);
              }));
              parser.on('end', (mailObject) => {
                if (!mailObject.headers['in-reply-to']) {
                  mailobj = mailObject;
                  const data = { attribs, mailobj };
                  cb(JSON.stringify(data));
                }
              });
              stream.pipe(parser);
            });
          });
          f.once('error', (imapErr) => {
            io.to(socket.id).emit('error', `on new mail, ${imapErr}`);
          });
          f.once('end', () => {});
        });
      };

      const triggerUpdateStatusObj = (trigUpdateStatusObj) => {
        if (err) io.to(socket.id).emit('error', err);
        imap.setKeywords(trigUpdateStatusObj.uid, [`${trigUpdateStatusObj.status}`], er => io.to(socket.id).emit('error', `imap update status ${er}`));
      };

      const triggerSearchKeyword = (trigSearchKeyword, cb) => {
        const parser = new MailParser();
        io.to(socket.id).emit('error', err);
        imap.search([['KEYWORD', `${trigSearchKeyword}`]], (eror, results) => {
          if (eror) {
            io.to(socket.id).emit('error', `search, ${eror}`);
          }
          if (results.length > 0) {
            const f = imap.fetch(results, { bodies: '' });
            f.on('message', (msg) => {
              msg.on('body', (stream) => {
                parser.on('end', (searchResult) => {
                  cb(JSON.stringify(searchResult));
                });
                stream.pipe(parser);
              });
            });
            f.once('error', (er) => {
              io.to(socket.id).emit('error', `search, ${er}`);
            });
            f.once('end', () => {});
          }
        });
      };
      const conversation = (msgId, cb) => {
        replies.map((reply) => {
          if (reply.mailobj.inReplyTo[0] === msgId) {
            cb(reply);
          }
        });
      };
      const sendReply = (message, cb) => {
        const uides = [];
        replies.map((reply) => {
          if (reply.mailobj.inReplyTo[0] === message.inReplyTo) {
            uides.push(reply.attribs.uid);
          }
        });
        const maxuid = Math.max.apply(null, uides);
        let reference = [];
        replies.map((rep) => {
          if (rep.attribs.uid === maxuid) {
            reference = rep.references;
            reference.unshift(rep.messageId);
          }
        });
        message.references = reference;
        cb(message);
      };
      events(
        socket,
        io,
        triggerGetMailsObj,
        triggerOnNewMail,
        triggerUpdateStatusObj,
        triggerSearchKeyword,
        conversation,
        sendReply,
      );
    });
  });
  imap.once('error', (err) => {
    io.to(socket.id).emit('error', { error: err });
  });
  imap.connect();
};
module.exports = mails;
