const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

app.set('port', process.env.PORT || 7425);
app.set('host', process.env.hostname || 'localhost');

app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
