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
    // console.log(jwt.verify(token, 'secret'));
    // console.log('sending token =>', token);
    res.status(200).send(token);
  },
);


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
  }
  if (isAuthorized(JWT)){
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
})

router.get('/api/isAuthenticated/:token', (req, res) => {
  console.log('isTTTTTTTAuth');
  // console.log('req.params => ', req.params);
  // console.log('req.query => ', req.query);
  if (req.params && req.params.token) {
    const id = jwt.verify(req.params.token, 'secret').id;
    // console.log('id: ', id);
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get('/api/currentSpace/:token/:spaceId', (req, res) => {
  db.helpers.getSpaceIncludingMembers(req.params.spaceId)
  .then((space) => res.status(200).send(space))
  .catch(err => console.error(err))
});

router.get('/api/currentListing/:token/:spaceId', (req, res) => {
  db.helpers.getSpaceById(req.params.spaceId)
  .then(space => res.status(200).send(space))
  .catch(err => console.error(err))
});

router.get('/api/listings/:token/:location', (req, res) => {
  db.helpers.getAllListings(req.params.location, req.fb_Id)
  .then(resultObj => res.status(200).send(resultObj))
  .catch(err => console.error(err));
});

router.post('/api/newSpace/:token', (req, res) => {
  db.helpers.addNewSpace(req.body.space, req.fb_Id)
  .then((newSpaceId) => res.status(201).send(JSON.stringify(newSpaceId)))
  .catch((err) => {console.error(err)});
});

router.post('/api/updateSpace/:token/:spaceId', (req, res) => {
  // console.log(req.body);
  req.body.id = req.params.spaceId
  db.helpers.updateSpace(req.body)
  .then((space) => res.status(202).send(space))
  .catch(err => console.error(err));
});

router.post('/api/updateGroundRules/:token', (req, res) => {
  db.helpers.updateGroundrules(req.body)
  .then((result) => res.status(202).send(result))
  .catch(err => console.error(err));
})

router.post('/api/addMember/:token', (req, res) => {
  db.helpers.addUsersToSpaces(req.body.fbId, req.body.spaceId)
  .then(spaceMembers => res.status(202).send(spaceMembers))
  .catch(err => console.error(err));
});

router.post('/api/deleteMember/:token', (req, res) => {
  db.helpers.deleteUsersFromSpaces(req.body.userId, req.body.spaceId)
  .then(spaceMembers => res.status(202).send(spaceMembers))
.catch(err => console.error(err));
});

router.get('/api/isOwner/:token/:spaceId', (req, res) => {
  db.helpers.isOwner(req.fb_Id, req.params.spaceId)
  .then((result) => res.status(200).send(result))
  .catch(err => console.error(err));
});

router.get('/api/currentUser/:token', (req, res) => {
  db.helpers.getUserIncludingSpaces(req.fb_Id)
  .then((user) => res.status(200).send(user))
  .catch(err => {console.error(err)});
});

router.post('/api/editProfile/:token', (req, res) => {
  db.helpers.updateUser(req.body)
  .then((user) => res.status(200).send(user))
  .catch(err => console.error(err));
});

router.get('/api/userPublic/:token/:userId', (req, res) => {
  // gets public information for a specified user
  // could this be done in batches for search purposes?
  db.helpers.getUserPublic(req.params.userId)
  .then(publicInfo => res.status(200).send(publicInfo))
  .catch(err => console.error(err));
})

// deprecated?
router.get('/api/currentUserSpaces/:token/:userId', (req, res) => {
  // console.log('currentUserSpaces endpoint');
  db.helpers.getSpacesByFbId(req.fb_Id)
  .then((spaces) => res.status(200).send(spaces))
  .catch(err => console.error(err));
});

router.post('/api/new-search/:token', (req, res) => {
  // console.log(req.body);
  db.helpers.addNewSearch(req.fb_Id, JSON.parse(req.body.search))
  .then((newSearchId) => res.status(201).send(JSON.stringify(newSearchId)))
  .catch(err => console.error(err));
});

router.post('/api/delete-search/:token/:searchId', (req, res) => {
  db.helpers.deleteSearchById(req.params.searchId)
  .then(destroyed => res.status(202).send(destroyed))
  .catch(err => console.error(err));
});

router.get('/api/saved-searches/:token', (req, res) => {
  db.helpers.getSearchesByFbId(req.fb_Id)
  .then(searches => res.status(200).send(searches))
  .catch(err => console.error(err));
})

router.get('/api/search-results/:token/:search_Id', (req, res) => {
  db.helpers.getAllMatches(req.params.search_Id)
  .then((matches) => {
    // no need to stringify
    res.status(200).send(matches);
  }).catch(err => console.error(err));
});

router.get('/api/get-location/:token/:city', (req, res) => {
  // is this for the geo-location?
  // returning 200 & input city
  res.status(200).send(JSON.stringify({data: `${req.params.city}`}))
  .catch(err => console.error(err));
});

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
