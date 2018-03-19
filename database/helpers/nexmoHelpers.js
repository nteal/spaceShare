const { User } = require('../models/userModel');
const { Space } = require('../models/spaceModel');

// takes arr of nexmo_ids
// returns obj with nexmo_ids mapped to user data
const getUsersFromNexmoIds = nexmoIds => (
  // get all users associated with given nexmoIds
  Promise.all(nexmoIds.map(nexmo_id => User.findOne({
    where: { nexmo_id },
    attributes: ['id', 'name_last', 'name_first', 'nexmo_id'],
  })))
    .then(userObjs => (
      userObjs.reduce((retObj, currentUser) => {
        // create obj containing only desired user data
        const singleUserObj = {
          name_last: currentUser.dataValues.name_last,
          name_first: currentUser.dataValues.name_first,
          id: currentUser.dataValues.id,
        };
        // add user data to return object
        retObj[currentUser.dataValues.nexmo_id] = singleUserObj;
        return retObj;
      }, {})
    ))
    .catch(err => console.log(err))
);


// takes fb_id
// returns obj with all their spaces' nexmo ids
const getSpaceConversations = fb_id => (
  // getUserObj
  User.findOne({
    where: { fb_id },
  })
    // get all spaces associated with user
    .then(user => (
      user.getSpaces({ attributes: ['id', 'name', 'convo_id', 'purpose_id'] })
    ))
    // return object with needed properties for all user's spaces
    .then(spaces => (
      spaces.reduce((retObj, spaceModel) => {
        const spaceObj = {};
        spaceObj.id = spaceModel.dataValues.id;
        spaceObj.name = spaceModel.dataValues.name;
        spaceObj.purpose_id = spaceModel.dataValues.purpose_id;
        const { convo_id } = spaceModel.dataValues;
        retObj[convo_id] = spaceObj;
        return retObj;
      }, {})
    ))
);

exports.getUsersFromNexmoIds = getUsersFromNexmoIds;
exports.getSpaceConversations = getSpaceConversations;
