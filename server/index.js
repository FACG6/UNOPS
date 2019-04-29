const socket = require('socket.io');
const Imap = require('imap');
const app = require('./app.js');
const events = require('./controllers/socket');
require('dotenv').config();

const { IMAP_USER: user, IMAP_USER_PASS: password } = process.env;
const server = app.listen(app.get('port'), app.get('host') || 'localhost', () => console.log(`Server is up on http://${app.get('host')}:${app.get('port')}`));
const io = socket(server);

io.on('connection', (socket) => {
  events(socket, io);
  io.on('disconnect', () => socket.close());
});
const imap = new Imap({
  user,
  password,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  connTimeout: 15000,
  authTimeout: 10000,
});
imap.on('ready', () => {
  console.log('imap connection established');
  imap.openBox('INBOX', false, (mailBoxError, mailbox) => {
    if (mailBoxError) throw mailBoxError;
    const f = imap.seq.fetch(`1:${mailbox.messages.total}`, { struct: true });
    f.on('message', msg => msg.on('attributes', ({ uid }) => imap.setKeywords(uid, ['pending'])));
    f.once('error', (fetchError) => {
      throw fetchError;
    });
    f.once('end', () => {
      console.log('all tickets were marked pending');
      imap.end();
    });
  });
});
imap.once('error', (connError) => {
  throw connError;
});
imap.once('end', () => console.log('imap connection was closed'));
imap.connect();
