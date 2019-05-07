const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const router = require('./controllers/index');

const app = express();

app.set('port', process.env.PORT || 7425);
app.set('host', process.env.hostname || 'localhost');
app.disable('x-powered-by');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.use('/api/v1', router);

app.use('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
