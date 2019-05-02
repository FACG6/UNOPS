const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jamalatshamallakh@gmail.com',
    pass: 'wcrzpxawjnbujzez',
  },
});
const message = {
  from: 'jamalatshamallakh@gmail.com',
  to: 'jamallat12shamallakh@gmail.com',
  bcc: '',
  subject: 'Re: test2',
  text: 'replay 1 from nodemailer to test3',
  html: '<p><b>replay from nodemailer</b> </p>',
  inReplyTo: 'CAO2Rdk=yGOojXtr-OWEhJEiMDNyHxF4Nvt+brVPzMqWfueVh-A@mail.gmail.com',
  references: ['CAO2Rdk=yGOojXtr-OWEhJEiMDNyHxF4Nvt+brVPzMqWfueVh-A@mail.gmail.com'],
};
transporter.sendMail(message).then(() => console.log('done')).catch(error => console.log(error));
