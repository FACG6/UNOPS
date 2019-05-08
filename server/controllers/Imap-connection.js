const Imap = require('imap');
const { MailParser } = require('mailparser-mit');
const events = require('../controllers/socket');
const getReplies = require('../database/queries/getReplies');
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
              let data = {};
              let attribs = {};
              let mailobj = {};
              const attrs = [];
              let i = 0;
              f.on('message', async (msg, seqno) => {
                msg.once('attributes', (attr) => {
                  attrs.push(attr);
                });
                if (attrs[i]) {
                  msg.on('body', async (stream, info) => {
                    const parser = new MailParser();
                    parser.on('end', (mailObject) => {
                      mailobj = mailObject;
                      attribs = attrs[i];
                      data = { attribs, mailobj };
                      i++;
                      if (!mailObject.headers['in-reply-to']) {
                        cb(JSON.stringify(data));
                      } else {
                        replies.push(data);
                      }
                    });
                    stream.pipe(parser);
                  });
                }
              });
              f.once('error', (getMailsErr) => {
                io.to(socket.id).emit('error', `get mails ${getMailsErr}`);
              });
            } catch (e) {
              io.to(socket.id).emit('error', 'get mails error, ((date)), nothing to fetch');
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
                mailobj = mailObject;
                const data = { attribs, mailobj };
                if (!mailObject.headers['in-reply-to']) {
                  cb(JSON.stringify(data));
                } else {
                  replies.push(data);
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

      const triggerUpdateStatusObj = (markAsObj) => {
        console.log(markAsObj);
        if (markAsObj.markAs === 'pending') {
          imap.delKeywords(markAsObj.uids, 'resolved', (er) => {
            if (er) io.to(socket.id).emit('error', `imap update status ${er}`);
          });
        } else {
          imap.delKeywords(markAsObj.uids, 'pending', (er) => {
            if (er) io.to(socket.id).emit('error', `imap update status ${er}`);
          });
        }
        imap.setKeywords(markAsObj.uids, `${markAsObj.markAs}`, (er) => {
          if (er) io.to(socket.id).emit('error', `imap update status ${er}`);
        });
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
        const allReplies = [];
        replies.map((reply) => {
          if (reply.mailobj.inReplyTo[0] === msgId) {
            allReplies.push(reply);
          }
        });
        getReplies(msgId).then((result) => {
          result.forEach(res => allReplies.push(res));
        });
        console.log(allReplies);
        cb(allReplies);
      };

      events(
        socket,
        io,
        triggerGetMailsObj,
        triggerOnNewMail,
        triggerUpdateStatusObj,
        triggerSearchKeyword,
        conversation,
      );
    });
  });
  imap.once('error', (err) => {
    io.to(socket.id).emit('error', { error: err });
  });
  imap.connect();
};
module.exports = mails;
