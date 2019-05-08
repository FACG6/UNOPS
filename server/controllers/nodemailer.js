const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.IMAP_USER,
    pass: process.env.IMAP_USER_PASS,
  },
});
module.exports = data => transporter.sendMail(data);
