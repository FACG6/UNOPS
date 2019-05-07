const express = require('express');
const { join } = require('path');
const login = require('./login');
const signup = require('./signup');
const { verifyAuthority } = require('../authentication/verifyCookie');

const router = express.Router();


router.post('/login', login.post);

router.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'createUser.html'));
});

router.post('/create-user', verifyAuthority, signup.post);


module.exports = router;
