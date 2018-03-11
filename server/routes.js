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
    console.log('sending token =>', token);
    res.status(200).send(token);
  },
);


router.param('token', (req, res, next, JWT) => {
  console.log('router param check');
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  // check authorization
  const isAuthorized = (JWT) => {
    // decode token
    const fbId = jwt.verify(JWT, 'secret');
    console.log(fbID);
    // verify user exists
    return db.helpers.userInDb(fbId);
  }
  if (isAuthorized(JWT)){
    // add ID to req
    req.fb_Id = fbId;
    console.log('fb_Id attached');
  } else {
    // or tell them no
    console.log('forbidden');
    res.sendStatus(403);
  }
  // move
  next();
})

router.get('/api/isAuthenticated/token/:token', (req, res) => {
  console.log('isTTTTTTTAuth');
  console.log('req.params => ', req.params);
  console.log('req.query => ', req.query);
  console.log('the request is -> ', req);
  if (req.params && req.params.token) {
    const id = jwt.verify(req.query.token, 'secret');
    console.log('id: ', id);
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get('/api/currentSpace', (req, res) => {

});

router.get('/api/currentUser', (req, res) => {
  console.log('getCurrentUser');
  db.helpers.getUserByFbId(req.fb_Id)
  .then((user) => {
    res.status(200).send(user);
  });

});

router.get('/api/currentUserSpaces/:token/:userId', (req, res) => {

});


router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
