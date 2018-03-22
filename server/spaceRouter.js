const spaceRouter = require('express').Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('../database');
const helpers = require('./helpers');

spaceRouter.param('token', (req, res, next, JWT) => {
  console.log('spaceRouter param check', req.url);
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

spaceRouter.get('/currentListing/:token/:spaceId', (req, res) => {
  db.helpers.getSpaceListingById(req.params.spaceId)
    .then(space => res.status(200).send(space))
    .catch(err => console.error(err));
});

spaceRouter.get('/currentSpace/:token/:spaceId', (req, res) => {
  db.helpers.getSpaceIncludingMembers(req.params.spaceId)
    .then(space => res.status(200).send(space))
    .catch(err => console.error(err));
});

spaceRouter.post('/newSpace/:token', (req, res) => (
  helpers.addLocToSpace(req.body.space)
    .then(spaceObj => db.helpers.addNewSpace(spaceObj, req.fb_Id))
    .then(newSpaceId => res.status(201).send(JSON.stringify(newSpaceId)))
    .catch(err => console.error(err))
));

spaceRouter.post('/updateSpace/:token/:spaceId', (req, res) => (
  // console.log(req.body);
  helpers.addLocToSpace(req.body)
    .then(spaceObj => db.helpers.updateSpace(Object.assign({ id: req.params.spaceId }, spaceObj)))
    .then(space => res.status(202).send(JSON.stringify(space)))
    .catch(err => console.error(err))
));

spaceRouter.post('/deleteSpace/:token', (req, res) => {
  db.helpers.destroySpace(req.body)
    .then(oldSpaceData => res.status(202).send(oldSpaceData))
    .catch(err => console.error(err));
});

spaceRouter.post('/updateGroundRules/:token', (req, res) => {
  db.helpers.updateGroundrules(req.body)
    .then(result => res.status(202).send(result))
    .catch(err => console.error(err));
});

spaceRouter.post('/addMember/:token', (req, res) => {
  db.helpers.addUsersToSpaces(req.body.fbId, req.body.spaceId)
    .then(spaceMembers => res.status(202).send(spaceMembers))
    .catch(err => console.error(err));
});

spaceRouter.post('/deleteMember/:token', (req, res) => {
  db.helpers.removeUserFromSpace(req.body.userId, req.body.spaceId)
    .then(spaceMembers => res.status(202).send(spaceMembers))
    .catch(err => console.error(err));
});

spaceRouter.post('/updateTodos/:token/:spaceId', (req, res) => {
  db.helpers.updateTodos(req.params.spaceId, req.body)
    .then((todos) => {
      res.status(201).send(todos);
    }).catch(err => console.error(err));
});

spaceRouter.get('/*', (req, res) => {
  console.log('from spaces');
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = spaceRouter;