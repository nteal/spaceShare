const chatRouter = require('express').Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('../database');
const chat = require('./chatHelp');


chatRouter.param('token', (req, res, next, JWT) => {
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


chatRouter.post('/newChat/:token', (req, res, next) => {
  const { displayName } = req.body;

  chat.createConversation(displayName)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

chatRouter.put('/joinChat/:token', (req, res, next) => {
  const { userNexmoId, conversationId } = req.body;

  chat.joinConversation(userNexmoId, conversationId)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

chatRouter.put('/inviteToChat/:token', (req, res, next) => {
  const { userNexmoId, conversationId } = req.body;

  chat.inviteToConversation(userNexmoId, conversationId)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

chatRouter.get('/userChats/:token', (req, res, next) => {
  const { userNexmoId } = req.body;

  chat.getAllConversations(userNexmoId)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

chatRouter.get('/getChat/:token/:conversationId', (req, res, next) => {
  chat.getConversationById(req.params.conversationId)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

chatRouter.get('/getNexmoId/:token', (req, res) => {
  db.helpers.getNexmoIdByFbId(req.fb_Id)
    .then(nexmoId => res.status(200).send(nexmoId))
    .catch(err => res.status(500).send(err));
});

chatRouter.get('/nexmoJwt/:token/:nexmoUsername', (req, res, next) => {
  chat.getJwt(req.params.nexmoUsername)
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error));
});

chatRouter.get('/spaceChats/:token', (req, res) => {
  db.helpers.getSpaceConversations(req.fb_Id)
    .then(spaceConvoIds => res.send(spaceConvoIds))
    .catch(error => res.status(500).send(error));
});

chatRouter.get('/usersByNexmoId/:token', (req, res) => {
  db.helpers.getUsersFromNexmoIds(req.query.nexmoIds)
    .then(users => res.send(users))
    .catch(error => res.status(500).send(error));
});

chatRouter.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = chatRouter;

