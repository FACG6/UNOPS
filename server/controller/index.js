const router = require('express').Router();

const { isFound } = require('../controller/middleware/isFound.js');


router.post('/login', isFound);
module.exports = router;
