const router = require('express').Router();
const path = require('path');
const helper = require('./helpers');


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

module.exports = router;
