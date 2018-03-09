const options = require('./optionHelpers');
const { User } = require('../models/userModel');
const { updateLinksForUser } = require('./userLinksHelpers');
const { getLinksByUser } = require('./userLinksHelpers');
const { getZodiac } = require('./zodiacHelpers');

const randPlanet = () => Math.floor(Math.random() * 10);

const addNewUser = (newUserObj) => {
  const userObj = Object.assign({ planet_id: randPlanet() }, newUserObj);
  return User.findOrCreate({ where: { fb_id: newUserObj.fb_id }, defaults: userObj })
    .then(([newUser]) => newUser.dataValues)
    .catch(err => console.log(err));
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
      ]);
    })
    .then(([gender, planet, personality, sleep]) => {
      userObj.gender = gender.self_identification;
      userObj.planet = planet.name;
      userObj.personality = personality.type;
      userObj.sleep = sleep.schedule;
      userObj.zodiac = getZodiac(userObj.birthdate);
      return userObj;
    })
    .catch(err => console.log(err));
};

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
