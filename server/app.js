const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const { sign } = require('jsonwebtoken');
const router = require('./controllers/index');

const app = express();

app.set('port', process.env.PORT || 7425);
app.set('host', process.env.hostname || 'localhost');
app.disable('x-powered-by');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const jwt = sign('socket', 'f$nd%565f4#dgf#');

app.use('*', (req, res) => {
  console.log(54546465);
  res.cookie('jwt', jwt);
  res.send('<div>Ahmed</div>');
});

app.use(express.static(join(__dirname, '..', 'client', 'build')));


app.use(router);
// app.get('*', (req, res) => {
//   res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
// });

module.exports = app;
