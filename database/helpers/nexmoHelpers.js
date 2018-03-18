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
);


// takes fb_id
// returns obj with all their spaces' nexmo ids

exports.getUsersFromNexmoIds = getUsersFromNexmoIds;
