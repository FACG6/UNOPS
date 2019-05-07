const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const router = require('./controllers/index');

const app = express();

const { sign } = require('jsonwebtoken');

const jwt = sign('socket', 'f$nd%565f4#dgf#');
app.use((req, res, next) => {
  res.cookie('jwt', jwt);
  next();
});

app.set('port', process.env.PORT || 7425);
app.set('host', process.env.hostname || 'localhost');
app.disable('x-powered-by');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.use(router);

module.exports = app;
