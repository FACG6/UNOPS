const router = require('express').Router();
const { validation } = require('../middleware/validation.js');
const { isFound } = require('../middleware/isFound.js');


router.post('/login', isFound);
