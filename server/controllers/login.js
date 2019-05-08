const bcrypt = require('bcryptjs');
const joi = require('joi');
const scheme = require('../validationScheme/scheme');
const assignCookie = require('../authentication/cookie');
const getUserByEmail = require('../database/queries/getUserByEmail');

exports.post = async (req, res) => {
  const reqBody = { ...req.body };
  const { error } = joi.validate(reqBody, scheme);
  if (!error) {
    try {
      const userData = await getUserByEmail(reqBody.email);
      bcrypt
        .compare(reqBody.password, userData.password)
        .then((result) => {
          if (result) {
            assignCookie(req, res, { name: userData.name, email: userData.email });
          } else {
            res.status(401).send('Wrong username or password.');
          }
        })
        .catch(error => res.status(500).send('Internal server error'));
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  } else {
    res.status(401).send('Not valid Email and/or password.');
  }
};
