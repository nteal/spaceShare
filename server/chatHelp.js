const Nexmo = require('nexmo');

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

const joinConversation = (userNexmoId, conversationId, callback) => {
  nexmo.conversations.members.add(conversationId, {
    action: 'join',
    user_id: userNexmoId,
    channel: {
      type: 'app',
    },
  }, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
};

const inviteToConversation = (userNexmoId, conversationId, callback) => {
  nexmo.conversations.members.add(conversationId, {
    action: 'invite',
    user_id: userNexmoId,
    channel: {
      type: 'app',
    },
  }, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
};

const getAllConversations = (userNexmoId, callback) => {
  nexmo.users.getConversations(userNexmoId, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
};

exports.createUser = createUser;
exports.createConversation = createConversation;
exports.joinConversation = joinConversation;
exports.inviteToConversation = inviteToConversation;
exports.getAllConversations = getAllConversations;
