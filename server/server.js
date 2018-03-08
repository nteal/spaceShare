const express = require('express');
const routes = require('./routes');
const path = require('path');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const db = require('../database');
const dotenv = require('dotenv').config();

const app = express();
const pathway = path.join(__dirname, '/../client/dist');
app.use(express.static(pathway));

passport.use(new FacebookTokenStrategy(
  {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
  },
  (accessToken, refreshToken, profile, done) => {
    // create new user here
  },
));

app.use('/', routes);

module.exports = app;
