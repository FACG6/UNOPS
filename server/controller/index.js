const express = require('express');
const login = require('./login');

const router = express.Router();

router.post('/api/login', login);


module.exports = router;
