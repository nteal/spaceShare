const Promise = require('bluebird');

const { isOwner } = require('./spaceHelpers');
const { getSpaceById } = require('./spaceHelpers');
const { getUserIdByFbId } = require('./userHelpers');
const { getUserByFbId } = require('./userHelpers');
const { getDashboardInfoById } = require('./spaceHelpers');

const { UserSpace } = require('../models/user_spaceModel');
const { Space } = require('../models/spaceModel');
const { User } = require('../models/userModel');

// get all members of space
const getSpaceMembers = spaceId => (
  UserSpace.findAll({ where: { spaceId } })
    .then(userSpaces => Promise.map(userSpaces, userSpace => User.findById(userSpace.userId)))
    .then(users => Promise.map(users, async user => (
      {
        name_last: user.name_last,
        name_first: user.name_first,
        phone: user.phone,
        email: user.email,
        image_url: user.image_url,
        fb_id: user.fb_id,
        fb_link: user.fb_link,
        id: user.id,
        is_owner: await isOwner(user.fb_id, spaceId),
      }
    )))
    .catch(err => console.log(err))
);

// get all spaces of a user
const getSpacesByFbId = fbId => (
  getUserIdByFbId(fbId)
    .then(userId => UserSpace.findAll({ where: { userId } }))
    .then(userSpaces => Promise.map(userSpaces, userSpace => (
      getDashboardInfoById(userSpace.spaceId))))
    .catch(err => console.log(err))
);

// takes fb id, returns full user data including space info
const getUserIncludingSpaces = fbId => (
  getUserByFbId(fbId)
    .then(async (user) => {
      const userWithSpaces = Object.assign({}, user);
      userWithSpaces.spaces = await getSpacesByFbId(user.fb_id);
      return userWithSpaces;
    })
    .catch(err => console.log(err))
);

// takes space id, returns full space data including members
const getSpaceIncludingMembers = spaceId => (
  getSpaceById(spaceId)
    .then(async (space) => {
      const spaceWithMembers = Object.assign({}, space);
      spaceWithMembers.members = await getSpaceMembers(space.id);
      return spaceWithMembers;
    })
    .catch(err => console.log(err))
);

// get user Fb ids of space

// add users to spaces:
const addUsersToSpaces = (fbId, spaceId) => (
  User.findOne({ where: { fb_id: fbId } })
    .then(user => UserSpace.create({ spaceId, userId: user.id }))
    .then(junction => junction.dataValues)
    .catch(err => console.log(err))
);

const removeUserFromSpace = (userId, spaceId) => (
  UserSpace.findOne({ where: { userId, spaceId } })
    .then(userSpace => userSpace.destroy())
    .then(destroyed => destroyed.dataValues)
    .catch(err => console.log(err))
);

exports.addUsersToSpaces = addUsersToSpaces;
exports.getSpacesByFbId = getSpacesByFbId;
exports.getSpaceMembers = getSpaceMembers;
exports.getUserIncludingSpaces = getUserIncludingSpaces;
exports.getSpaceIncludingMembers = getSpaceIncludingMembers;
exports.removeUserFromSpace = removeUserFromSpace;
