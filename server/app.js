const express = require('express');
const router = require('./controller/index');

const app = express();
// const cookieParser = require('cookie-parser');

app.set('port', process.env.PORT || 7425);
app.set('host', process.env.hostname || 'localhost');
// app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

module.exports = app;
