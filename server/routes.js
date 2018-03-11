const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../database');


router.post(
  '/auth/facebook',
  passport.authenticate('facebook-token'),
  (req, res) => {
    console.log('inside auth cb');
    // console.dir(req);
    const token = jwt.sign(
      { id: req.user.id },
      'secret', { expiresIn: '1h' },
    );
    console.log(jwt.verify(token, 'secret'));
    console.log('sending token =>', token);
    res.status(200).send(token);
  },
);


router.param('token', (req, res, next, JWT) => {
  console.log('router param check', req.url);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  // check authorization
  const isAuthorized = (JWT) => {
    // decode token
    const jwtObject = jwt.verify(JWT, 'secret');
    const fbId = jwtObject.id;
    console.log(fbId);
    // verify user exists
    return db.helpers.userInDb(fbId);
  }
  if (isAuthorized(JWT)){
    // add ID to req
    req.fb_Id = jwt.verify(JWT, 'secret').id;
    // console.log('fb_Id attached', req.fb_Id);
  } else {
    // or tell them no
    console.log('forbidden');
    res.sendStatus(403);
  }
  // move
  next();
})

router.get('/api/isAuthenticated/token/:token', (req, res) => {
  // console.log('isTTTTTTTAuth');
  console.log('req.params => ', req.params);
  // console.log('req.query => ', req.query); // empty object
  if (req.params && req.params.token) {
    const id = jwt.verify(req.params.token, 'secret').id;
    // console.log('id: ', id);
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get('/api/currentSpace/token/:token', (req, res) => {

});

router.get('/api/currentUser/token/:token', (req, res) => {
  // console.log('getCurrentUser', Object.keys(req));
  // database helper
  db.helpers.getUserByFbId(req.fb_Id)
  .then((user) => {
    // send status and user
    res.status(200).send(user);
  });

});

router.get('/api/currentUserSpaces/token/:token/userId/:userId', (req, res) => {
  console.log('get currentUserSpaces');
  res.status(200).send('sheReady');

});

router.get('/api/new-search/token/:token', (req, res) => {
  res.status(200).send('hit new-seach');
});


router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
