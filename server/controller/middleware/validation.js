const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getUser = require('../database/queries/getUser.js');

exports.isFound = (req, res, next) => {
  console.log(req);

  getUser(req.body.email).then((resultIsFound) => {
    console.log(resultIsFound);

    if (!resultIsFound) {
      console.log('not register');
      res.end();
    } else {
      bcrypt.compare(req.body.password, resultIsFound.rows[0].password).then((resultCompare) => {
        if (resultCompare) {
          const userInfo = {
            userId: resultIsFound.rows[0].id,
            email: resultIsFound.rows[0].email,
          };
          jwt.sign(userInfo, process.env.SECRET).then((token) => {
            if (token) {
              res.cookie('jwt', token, { maxAge: 50 * 50 * 100000 });
              res.end();
            }
          });
        }
      });
    }
  }).catch(err => next(err));
};
