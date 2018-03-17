const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APP_ID,
  privateKey: process.env.NEXMO_PRIVATE_KEY,
});

const createUser = username => (
  new Promise((resolve, reject) => {
    // get all users
    nexmo.users.get({}, (error, users) => {
      if (error) {
        reject(error);
      } else {
        // check if user exists
        const filteredUsers = users.filter(user => user.name === username);
        // if user doesn't already exist, create them
        if (!filteredUsers.length) {
          nexmo.users.create({ name: username }, (err, response) => {
            if (err) {
              reject(err);
            } else {
              // nexmo user id = response.id
              resolve(response);
            }
          });
        // else, just send back their id
        } else {
          resolve({ id: filteredUsers[0].id });
        }
      }
    });
  })
);

const createConversation = displayName => (
  new Promise((resolve, reject) => {
    nexmo.conversations.create({ display_name: displayName }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        // conversation id = response.id
        resolve(response);
      }
    });
  })
);

const joinConversation = (userNexmoId, conversationId) => (
  new Promise((resolve, reject) => {
    nexmo.conversations.members.add(conversationId, {
      action: 'join',
      user_id: userNexmoId,
      channel: {
        type: 'app',
      },
    }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  })
);


const inviteToConversation = (userNexmoId, conversationId) => (
  new Promise((resolve, reject) => {
    nexmo.conversations.members.add(conversationId, {
      action: 'invite',
      user_id: userNexmoId,
      channel: {
        type: 'app',
      },
    }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  })
);


const getAllConversations = userNexmoId => (
  new Promise((resolve, reject) => {
    nexmo.users.getConversations(userNexmoId, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  })
);


const getConversationById = conversationId => (
  new Promise((resolve, reject) => {
    nexmo.conversations.get(conversationId, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  })
);


const getJwt = (userNexmoId) => {
  const nonAdminAcl = {
    paths: {
      '/v1/sessions/**': {
        methods: ['GET'],
      },
      '/v1/users/*': {
        methods: ['GET'],
      },
      '/v1/conversations/*': {
        methods: ['GET', 'POST', 'PUT'],
      },
    },
  };
  return new Promise((resolve, reject) => {
    nexmo.users.get({}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        const filteredUsers = response.filter(user => user.id === userNexmoId);
        if (!filteredUsers.length) {
          reject({ error: 'User not found' });
        } else {
          resolve({
            user_jwt: Nexmo.generateJwt(process.env.NEXMO_PRIVATE_KEY, {
              application_id: process.env.NEXMO_APP_ID,
              sub: userNexmoId,
              exp: new Date().getTime() + 86400,
              acl: nonAdminAcl,
            }),
          });
        }
      }
    });
  });
};

exports.createUser = createUser;
exports.createConversation = createConversation;
exports.joinConversation = joinConversation;
exports.inviteToConversation = inviteToConversation;
exports.getAllConversations = getAllConversations;
exports.getConversationById = getConversationById;
exports.getJwt = getJwt;

