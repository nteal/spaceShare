const router = require('express').Router();
const path = require('path');
const helper = require('./helpers');


router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname), 'index.html');
});

module.exports = router;
