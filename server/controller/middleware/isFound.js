const bcrypt = require('bcryptjs');
const getUser = require('../../database/queries/getUser.js');
const genToken = require('../middleware/gentoken.js');

exports.isFound = (req, res) => {
  const { emailValue, passwordValue } = req.body;
  getUser(emailValue).then((resultIsFound) => {
    if (!resultIsFound.rows.length) {
      res.json('this email does not exist');
    } else {
      bcrypt.compare(passwordValue, resultIsFound.rows[0].password).then((resultCompare) => {
        if (resultCompare) {
          const userInfo = {
            userId: resultIsFound.rows[0].id,
            email: resultIsFound.rows[0].email,
          };
          genToken(userInfo).then((token) => {
            if (token) {
              res.cookie('jwt', token, { maxAge: 50 * 50 * 100000 });
              res.json('add successfully');
            }
          });
        }
      });
    }
  }).catch((error) => { res.json('internal server error '); });
};
