const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jamalatshamallakh@gmail.com',
    pass: 'wcrzpxawjnbujzez',
  },
});
module.exports = data => transporter.sendMail(data);
