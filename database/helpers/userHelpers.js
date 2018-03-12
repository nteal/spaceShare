const options = require('./optionHelpers');
const { User } = require('../models/userModel');
const { getLinksByUser } = require('./userLinksHelpers');
const { getZodiac } = require('./zodiacHelpers');
const { updateLinksForUser } = require('./userLinksHelpers');

const randPlanet = () => {
  let planetId = Math.floor(Math.random() * 10);
  console.log('*****************planet id: should be 1-9', planetId);
  return planetId;
};


const getUserById = (userId) => {
  const userObj = {};
  return User.findById(userId)
    .then((user) => {
      Object.assign(userObj, user.dataValues);
      return Promise.all([
        options.getGenderById(user.gender_id),
        options.getPlanetById(user.planet_id),
        options.getPersonalityById(user.personality_id),
        options.getSleepById(user.sleep_id),
        getLinksByUser(user.id),
      ]);
    })
    .then(([gender, planet, personality, sleep, links]) => {
      userObj.gender = gender.self_identification;
      userObj.planet = planet.name;
      userObj.personality = personality.type;
      userObj.sleep = sleep.schedule;
      userObj.zodiac = getZodiac(userObj.birthdate);
      userObj.links = links;
      return userObj;
    })
    .catch(err => console.log(err));
};

const addNewUser = (newUserObj) => {
  const userObj = Object.assign({ planet_id: randPlanet() }, newUserObj);
  return User.findOrCreate({ where: { fb_id: newUserObj.fb_id }, defaults: userObj })
    .then(([newUser]) => getUserById(newUser.id))
    .catch(err => console.log(err));
};

const getUserIdByFbId = (fbId) => {
  return User.findOne({ where: { fb_id: fbId } })
  .then(user => user.dataValues.id)
  .catch(err => console.log(err));
}

const getUserByFbId = (fbId) => {
  const userObj = {};
  return User.findOne({ where: { fb_id: fbId } })
    .then((user) => {
      Object.assign(userObj, user.dataValues);
      return Promise.all([
        options.getGenderById(user.gender_id),
        options.getPlanetById(user.planet_id),
        options.getPersonalityById(user.personality_id),
        options.getSleepById(user.sleep_id),
        getLinksByUser(user.id),
      ]);
    })
    .then(([gender, planet, personality, sleep, links]) => {
      userObj.gender = gender.self_identification;
      userObj.planet = planet.name;
      userObj.personality = personality.type;
      userObj.sleep = sleep.schedule;
      userObj.zodiac = getZodiac(userObj.birthdate);
      userObj.links = links;
      return userObj;
    })
    .catch(err => console.log(err));
};

const userInDb = fbId => (
  User.findOne({ where: { fb_id: fbId } })
    .then(user => (!!user))
    .catch(err => console.log(err))
);

const updateUser = newUserData => (
  // having multiple links doesn't allow me to include it in .then chaining
  updateLinksForUser(newUserData.id, newUserData.links)
    .then(() => User.findById(newUserData.id))
    .then(user => user.update(newUserData))
    .then(updatedUser => getUserById(updatedUser.id))
    .catch(err => console.log(err))
);

exports.addNewUser = addNewUser;
exports.getUserById = getUserById;
exports.getUserByFbId = getUserByFbId;
exports.updateUser = updateUser;
exports.userInDb = userInDb;
exports.getUserIdByFbId = getUserIdByFbId;
