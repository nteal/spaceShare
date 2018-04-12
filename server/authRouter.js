const authRouter = require('express').Router();
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../database');



authRouter.post(
  '/facebook',
  passport.authenticate('facebook-token'),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id },
      'secret', { expiresIn: '50hr' },
    );
    res.status(200).send(token);
  },
);

authRouter.param('token', (req, res, next, JWT) => {
  console.log('router param check', req.url);
  // check authorization
  const isAuthorized = (JWT) => {
    // decode token
    const jwtObject = jwt.verify(JWT, 'secret');
    const fbId = jwtObject.id;
    // verify user exists
    return db.helpers.userInDb(fbId);
  };
  if (JWT !== 'null' && isAuthorized(JWT)) {
    // add ID to req
    req.fb_Id = jwt.verify(JWT, 'secret').id;
    console.log('fb_Id attached', req.fb_Id);
  } else if (req.url.includes('/isAuthenticated')) {
    next();
  } else {
    // or tell them no
    console.error('unauthorized: forbidden');
    res.sendStatus(403);
  }
  // move
  next();
});

authRouter.get('/isAuthenticated/:token', (req, res) => {
  if (req.params && req.params.token && req.params.token !== 'null') {
    const id = jwt.verify(req.params.token, 'secret').id;
    res.send(true);
  } else {
    res.send(false);
  }
});

authRouter.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = authRouter;
