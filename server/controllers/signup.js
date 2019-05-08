const bcrypt = require('bcryptjs');
const joi = require('joi');
const scheme = require('../validationScheme/scheme');
const addUser = require('../database/queries/addUser');

exports.post = async (req, res) => {
  try {
    const reqBody = { ...req.body };
    const { error } = joi.validate(reqBody, scheme);
    if (!error) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) res.status(500).send('Internal server error.');
        bcrypt.hash(reqBody.password, salt).then((result) => {
          if (result) {
            addUser({ email: reqBody.email, name: reqBody.name, password: reqBody.password });
            res.redirect('/tickets/all-tickets');
          }
        }).catch(error => res.status(500).send('Internal server error'));
      });
    } else {
      res.status(401).send('Not valid Email and/or password.');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};
