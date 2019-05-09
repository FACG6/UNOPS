const joi = require('joi');

exports.schema = joi.object().keys({
  name: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30)
    .required(),
  email: joi.string().email({
    minDomainAtoms: 2,
  }).required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{8,16}$/).min(8).required(),
});
