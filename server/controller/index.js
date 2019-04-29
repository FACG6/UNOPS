const express = require('express');

const router = express.Router();


router.get('*', (req, res) => {
  console.log(64646464664464);
  // const jwt = sign('socket', 'f$nd%565f4#dgf#');
  // res.cookie('jwt', jwt);
  res.send();
});


module.exports = router;
