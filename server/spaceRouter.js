const spaceRouter = require('express').Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('../database');
const helpers = require('./helpers');

spaceRouter.param('token', (req, res, next, JWT) => {
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

spaceRouter.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = spaceRouter;