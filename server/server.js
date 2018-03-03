const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();
const pathway = path.join(__dirname, '/../client/dist');
app.use(express.static(pathway));

app.use('/', routes);

module.exports = app;
