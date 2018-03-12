const Promise = require('bluebird');
const { Space } = require('../models/spaceModel');
const { User } = require('../models/userModel');
const { UserSpace } = require('../models/user_spaceModel');
const { getDashboardInfoById } = require('./spaceHelpers');
const { getUserIdByFbId } = require('./userHelpers');

// get all members of space


// get all spaces of a user
const getSpacesByFbId = fbId => {
  return getUserIdByFbId(fbId)
    .then(userId => UserSpace.findAll({ where: { userId: userId } }))
    .then(userSpaces => Promise.map(userSpaces, userSpace => getDashboardInfoById(userSpace.spaceId)))
    .catch(err => console.log(err));
}

// get user Fb ids of space

// add users to spaces:
const addUsersToSpaces = (fbId, spaceId) => {
  return User.findOne({ where: { fb_id: fbId } })
  .then(user => UserSpace.create({spaceId: spaceId, userId: user.id}))
  .then(junction => junction.dataValues)
  .catch(err => console.log(err));
}

exports.addUsersToSpaces = addUsersToSpaces;
exports.getSpacesByFbId = getSpacesByFbId;