const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

// router.get('/api/isAuthenticated', (req, res) => { // this goes behind api, too, no?
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

router.get('/api/currentSpace', (req, res) => {

});

router.get('/api/currentUser', (req, res) => {
  
});

router.get('/api/currentUserSpaces', (req, res) => {
  
});



router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
