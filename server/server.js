const express = require('express');
const routes = require('./routes');
const path = require('path');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('../database');
const dotenv = require('dotenv').config();

const app = express();
const pathway = path.join(__dirname, '/../client/dist');
app.use(express.static(pathway));
app.use(cors());
app.use(bodyParser.json());

passport.use(new FacebookTokenStrategy(
  {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('profile:');
    console.dir(profile);
    // create new user here
    // db.userHelpers.addNewUser({
    //   about: '',
    //   image_url: '',
    //   name_first: '',
    //   phone: 1231231234,
    //   email: '',
    //   fb_id: '',
    //   fb_link: 'facebook.com',
    //   fb_verified: false,
    //   searchable_work: false,
    //   searchable_live: false,
    //   profession: 'programmer',
    //   birthdate: new Date(),
    //   gender_id: 2,
    //   sleep_id: 1,
    //   personality_id: 1,
    //   planet_id: 6,
    // }, (err, user) => done(err, user));
  },
));

app.use('/', routes);

module.exports = app;
