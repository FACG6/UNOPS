const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
// const bc = (password, cb) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) cb(err);
//     bcrypt.hash(password, salt, cb);
//   });
// };
// bc('123', (error, result) => {
//   console.log(result);
// });

const gencookie = payload => new Promise((resolve, reject) => {
  sign(payload, 'jamalat', (error, token) => {
    if (error) reject(error);
    else resolve(token);
  });
});
module.exports = gencookie;
// gentoken(email).then(token => response.cookie('email', token), { maxAge: 60 * 60 * 60 });
// gencookie('jamalat@gmail.com').then(token => console.log(token));
