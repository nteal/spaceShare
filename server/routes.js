const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../database');
const helpers = require('./helpers');
const chat = require('./chatHelp');
const matchingHelp = require('./matchingHelp');



router.param('token', (req, res, next, JWT) => {
  console.log('router param check', req.url);
  // check authorization
  const isAuthorized = (JWT) => {
    // decode token
    const jwtObject = jwt.verify(JWT, 'secret');
    const fbId = jwtObject.id;
    // console.log(fbId);
    // verify user exists
    return db.helpers.userInDb(fbId);
  };
  if (isAuthorized(JWT)) {
    // add ID to req
    req.fb_Id = jwt.verify(JWT, 'secret').id;
    console.log('fb_Id attached', req.fb_Id);
  } else {
    // or tell them no
    console.error('unauthorized: forbidden');
    res.sendStatus(403);
  }
  // move
  next();
});





router.get('/api/currentListing/:token/:spaceId', (req, res) => {
  db.helpers.getSpaceListingById(req.params.spaceId)
    .then(space => res.status(200).send(space))
    .catch(err => console.error(err));
});

router.get('/api/listings/:token/:location', (req, res) => {
  db.helpers.getAllListings(req.params.location, req.fb_Id)
    .then(resultObj => res.status(200).send(resultObj))
    .catch(err => console.error(err));
});





router.post('/api/updateGroundRules/:token', (req, res) => {
  db.helpers.updateGroundrules(req.body)
    .then(result => res.status(202).send(result))
    .catch(err => console.error(err));
});

router.post('/api/addMember/:token', (req, res) => {
  db.helpers.addUsersToSpaces(req.body.fbId, req.body.spaceId)
    .then(spaceMembers => res.status(202).send(spaceMembers))
    .catch(err => console.error(err));
});

router.post('/api/deleteMember/:token', (req, res) => {
  db.helpers.removeUserFromSpace(req.body.userId, req.body.spaceId)
    .then(spaceMembers => res.status(202).send(spaceMembers))
    .catch(err => console.error(err));
});




router.post('/api/updateTodos/:token/:spaceId', (req, res) => {
  db.helpers.updateTodos(req.params.spaceId, req.body)
    .then((todos) => {
      res.status(201).send(todos);
    }).catch(err => console.error(err));
});


router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
