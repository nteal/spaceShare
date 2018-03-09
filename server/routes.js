const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get([
  '/dashboard',
  '/edit-profile',
  '/profile',
  '/common-area',
  '/common-area/*',
  '/messages',
  '/new-space',
  '/edit-space',
  '/search',
  '/results',
  '/listings',
  '/saved-searches',
], (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

router.post(
  '/auth/facebook',
  passport.authenticate('facebook-token'),
  (req, res) => {
    console.log('inside auth cb');
    console.dir(req);
    const token = jwt.sign(
      { id: req.user.id },
      'secret', { expiresIn: '1h' },
    );
    res.status(200).send(token);
  },
);

router.get('/isAuthenticated', (req, res) => {
  console.log('isAuth');
  console.dir(req);
  console.dir(req.query);
  if (req.query && req.query.token) {
    const id = jwt.verify(req.query.token, 'secret');
    console.log('id: ', id);
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
