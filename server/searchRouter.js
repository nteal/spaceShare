const searchRouter = require('express').Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('../database');
const helpers = require('./helpers');
const matchingHelp = require('./matchingHelp');


searchRouter.param('token', (req, res, next, JWT) => {
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

searchRouter.get('/listings/:token/:location', (req, res) => {
  db.helpers.getAllListings(req.params.location, req.fb_Id)
    .then(resultObj => res.status(200).send(resultObj))
    .catch(err => console.error(err));
});

searchRouter.post('/new-search/:token', (req, res) => (
  // console.log(req.body);
  helpers.addLocToSearch(req.body.search)
    .then(searchObj => db.helpers.addNewSearch(req.fb_Id, searchObj))
    .then(newSearchId => res.status(201).send(JSON.stringify(newSearchId)))
    .catch(err => console.error(err))
));

searchRouter.post('/delete-search/:token/:searchId', (req, res) => {
  db.helpers.deleteSearchById(req.params.searchId)
    .then(destroyed => res.status(202).send(destroyed))
    .catch(err => console.error(err));
});

searchRouter.get('/saved-searches/:token', (req, res) => {
  db.helpers.getSearchesByFbId(req.fb_Id)
    .then(searches => res.status(200).send(searches))
    .catch(err => console.error(err));
});

searchRouter.get('/search-results/:token/:search_Id', (req, res) => {
  matchingHelp.match(req.params.search_Id)
    .then((matches) => {
      // no need to stringify
      res.status(200).send(matches);
    }).catch(err => console.error(err));
});

searchRouter.get('/*', (req, res) => {
  console.log('from search');
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = searchRouter;


