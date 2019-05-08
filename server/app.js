const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const app = express();

const { sign } = require('jsonwebtoken');
const router = require('./controllers/index');

const jwt = sign('socket', 'f$nd%565f4#dgf#');
app.use((req, res, next) => {
  res.cookie('jwt', jwt);
  next();
});

app.set('port', process.env.PORT || 7425);
app.disable('x-powered-by');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.use('/api/v1', router);

app.use('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
