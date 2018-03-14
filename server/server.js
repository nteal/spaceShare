const express = require('express');
const routes = require('./routes');
const path = require('path');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const db = require('../database');
const dotenv = require('dotenv').config();

const app = express();
const pathway = path.join(__dirname, '/../client/dist');
app.use(express.static(pathway));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(
  '/s3',
  require('react-s3-uploader/s3router')({
    bucket: 'spaceshare-sfp',
    region: 'us-east-1',
    headers: { 'Access-Control-Allow-Origin': '*' },
    ACL: 'public-read',
    uniquePrefix: true,
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new FacebookTokenStrategy(
  {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
  },
  (accessToken, refreshToken, profile, done) => {
    try {
      const newUser = profile;
      // create new user if current user is not in db
      db.helpers.addNewUser({
        image_url: profile.photos[0].value || 'http://vectips.com/wp-content/uploads/2017/04/14-astronaut-flat.jpg',
        name_first: profile.name.givenName,
        name_last: profile.name.familyName,
        email: profile.emails[0].value,
        fb_id: profile.id,
      })
        .then((response) => {
          console.log('new user created', response);
          done(null, newUser);
        });
    } catch (error) {
      done(error);
    }
  },
));

app.use('/', routes);

module.exports = app;
