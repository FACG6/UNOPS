const bcrypt = require('bcryptjs');
const { getuser } = require('../database/queries/getuser');
const gentoken = require('./gentoken');

const login = (req, response) => {
  const { email, password } = req.body;
  getuser(email).then((res) => {
    if (res.rows.length > 0) {
      bcrypt.compare(password, res.rows[0].password).then((result) => {
        if (result) {
          gentoken(email).then((token) => {
            response.cookie('email', token, { maxAge: 60 * 60 * 60 });
            response.status(200).json({ msg: 'done' });
          });
        } else response.json({ msg: 'password error' });
      });
    } else response.json({ msg: 'This email does not exist' });
  }).catch(error => response.json('internal server error'));
};
module.exports = login;
