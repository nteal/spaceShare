const express = require('express');
const Nexmo = require('nexmo');

const router = express.Router();

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APP_ID,
  privateKey: process.env.NEXMO_PRIVATE_KEY,
});

const createUser = (username, callback) => {
  nexmo.users.create({ name: username }, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      // nexmo user id = response.id
      callback(null, response);
    }
  });
};

const createConversation = (displayName, callback) => {
  nexmo.conversations.create({ display_name: displayName }, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      // conversation id = response.id
      callback(null, response);
    }
  });
};


exports.createUser = createUser;
exports.createConversation = createConversation;
