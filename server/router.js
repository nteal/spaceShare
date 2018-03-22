const router = require('express').Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('../database');

router.param('token', (req, res, next, JWT) => {
  const isAuthorized = (JWT) => {
    const jwtObject = jwt.verify(JWT, 'secret');
    const fbId = jwt.Object.id;
    return db.helpers.userInDb(fbId);
  };
  if (isAuthorized(JWT)) {
    req.fb_Id = jwt.verify(JWT, 'secret').id;
  } else {
    console.error('unauthorized: forbidden');
    res.sendStatus(403);
  }
  next();
});

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
