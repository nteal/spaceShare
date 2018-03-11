const { Space } = require('../models/spaceModel');
const { User } = require('../models/userModel');
const { UserSpace } = require('../models/user_spaceModel');

// get all members of space
// get all spaces of a user

// add users to spaces:
const addUsersToSpaces = (fbId, spaceId) => {
  return User.findOne({ where: { fb_id: fbId } })
  .then(user => UserSpace.create({spaceId: spaceId, userId: user.id}))
  .then(junction => junction.dataValues)
  .catch(err => console.log(err));
}

exports.addUsersToSpaces = addUsersToSpaces;