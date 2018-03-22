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



router.post('/api/new-search/:token', (req, res) => (
  // console.log(req.body);
  helpers.addLocToSearch(req.body.search)
    .then(searchObj => db.helpers.addNewSearch(req.fb_Id, searchObj))
    .then(newSearchId => res.status(201).send(JSON.stringify(newSearchId)))
    .catch(err => console.error(err))
));

router.post('/api/delete-search/:token/:searchId', (req, res) => {
  db.helpers.deleteSearchById(req.params.searchId)
    .then(destroyed => res.status(202).send(destroyed))
    .catch(err => console.error(err));
});

router.get('/api/saved-searches/:token', (req, res) => {
  db.helpers.getSearchesByFbId(req.fb_Id)
    .then(searches => res.status(200).send(searches))
    .catch(err => console.error(err));
});

router.get('/api/search-results/:token/:search_Id', (req, res) => {
  matchingHelp.match(req.params.search_Id)
    .then((matches) => {
      // no need to stringify
      res.status(200).send(matches);
    }).catch(err => console.error(err));
});

router.post('/api/updateTodos/:token/:spaceId', (req, res) => {
  db.helpers.updateTodos(req.params.spaceId, req.body)
    .then((todos) => {
      res.status(201).send(todos);
    }).catch(err => console.error(err));
});

// deprecated
// router.get('/api/get-location/:token/:city', (req, res) => {
//   // is this for the geo-location?
//   // returning 200 & input city
//   res.status(200).send(JSON.stringify({data: `${req.params.city}`}))
//   .catch(err => console.error(err));
// });

router.post('/api/newChat/:token', (req, res, next) => {
  const { displayName } = req.body;

  chat.createConversation(displayName)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

router.put('/api/joinChat/:token', (req, res, next) => {
  const { userNexmoId, conversationId } = req.body;

  chat.joinConversation(userNexmoId, conversationId)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

router.put('/api/inviteToChat/:token', (req, res, next) => {
  const { userNexmoId, conversationId } = req.body;

  chat.inviteToConversation(userNexmoId, conversationId)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

router.get('/api/userChats/:token', (req, res, next) => {
  const { userNexmoId } = req.body;

  chat.getAllConversations(userNexmoId)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

router.get('/api/getChat/:token/:conversationId', (req, res, next) => {
  chat.getConversationById(req.params.conversationId)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

router.get('/api/getNexmoId/:token', (req, res) => {
  db.helpers.getNexmoIdByFbId(req.fb_Id)
    .then(nexmoId => res.status(200).send(nexmoId))
    .catch(err => res.status(500).send(err));
});

router.get('/api/nexmoJwt/:token/:nexmoUsername', (req, res, next) => {
  chat.getJwt(req.params.nexmoUsername)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

router.get('/api/spaceChats/:token', (req, res) => {
  db.helpers.getSpaceConversations(req.fb_Id)
    .then(spaceConvoIds => res.send(spaceConvoIds))
    .catch(error => res.status(500).send(error));
});

router.get('/api/usersByNexmoId/:token', (req, res) => {
  db.helpers.getUsersFromNexmoIds(req.query.nexmoIds)
    .then(users => res.send(users))
    .catch(error => res.status(500).send(error));
});

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
