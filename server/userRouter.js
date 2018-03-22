const userRouter = require('express').Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('../database');

userRouter.param('token', (req, res, next, JWT) => {
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

userRouter.get('/isOwner/:token/:spaceId', (req, res) => {
db.helpers.isOwner(req.fb_Id, req.params.spaceId)
.then(result => res.status(200).send(result))
    .catch(err => console.error(err));
});

userRouter.get('/currentUser/:token', (req, res) => {
  db.helpers.getUserIncludingSpaces(req.fb_Id)
    .then(user => res.status(200).send(user))
    .catch(err => console.error(err));
});

userRouter.post('/editProfile/:token', (req, res) => {
  db.helpers.updateUser(req.body)
    .then(user => res.status(200).send(user))
    .catch(err => console.error(err));
});

userRouter.get('/userPublic/:token/:userId', (req, res) => {
  // gets public information for a specified user
  // could this be done in batches for search purposes?
  db.helpers.getUserPublic(req.params.userId)
    .then(publicInfo => res.status(200).send(publicInfo))
    .catch(err => console.error(err));
})

// deprecated?
userRouter.get('/currentUserSpaces/:token/:userId', (req, res) => {
  // console.log('currentUserSpaces endpoint');
  db.helpers.getSpacesByFbId(req.fb_Id)
    .then(spaces => res.status(200).send(spaces))
    .catch(err => console.error(err));
});

userRouter.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = userRouter;
