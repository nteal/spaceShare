const { User } = require('../models/userModel');
const options = require('./optionHelpers');
const moment = require('moment');
const { updateLinkForUser } = require('./userLinksHelpers');
const { addLinksForUser } = require('./userLinksHelpers');
const { deleteLinkForUser } = require('./userLinksHelpers');

const randPlanet = () => Math.floor(Math.random() * 10);

const getZodiac = (birthdate) => {
  // hardcoded 2018 to fit into 'iso format' to work with moment,
  // needed to all be same year for correct zodiac match
  const date = `2018-${moment(birthdate).format('MM-DD')}`;
  let zodiac;
  if (moment(date).isBefore('2018-01-20')) {
    zodiac = 'Capricorn';
  } else if (moment(date).isBefore('2018-02-19')) {
    zodiac = 'Aquarius';
  } else if (moment(date).isBefore('2018-03-21')) {
    zodiac = 'Pisces';
  } else if (moment(date).isBefore('2018-04-20')) {
    zodiac = 'Aries';
  } else if (moment(date).isBefore('2018-05-21')) {
    zodiac = 'Taurus';
  } else if (moment(date).isBefore('2018-06-21')) {
    zodiac = 'Gemini';
  } else if (moment(date).isBefore('2018-04-23')) {
    zodiac = 'Cancer';
  } else if (moment(date).isBefore('2018-08-23')) {
    zodiac = 'Leo';
  } else if (moment(date).isBefore('2018-09-23')) {
    zodiac = 'Virgo';
  } else if (moment(date).isBefore('2018-10-23')) {
    zodiac = 'Libra';
  } else if (moment(date).isBefore('2018-11-22')) {
    zodiac = 'Scorpio';
  } else if (moment(date).isBefore('2018-12-22')) {
    zodiac = 'Sagittarius';
  } else {
    zodiac = 'Capricorn';
  }
  return zodiac;
};

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

const updateUser = (newUserData) => {
  // having multiple links doesn't allow me to include it in .then chaining
  if (newUserData.links) {
    newUserData.links.forEach((link) => {
      if (!link.url && link.id) {
        deleteLinkForUser(link.id);
      } else if (link.id) {
        updateLinkForUser(link);
      } else {
        const newLink = Object.assign({ user_id: newUserData.id }, link);
        addLinksForUser([newLink]);
      }
    });
  }
  return User.findById(newUserData.id)
    .then(user => user.update(newUserData))
    .then(updatedUser => updatedUser.dataValues)
    .catch(err => console.log(err));
};


exports.addNewUser = addNewUser;
exports.getUserById = getUserById;
exports.getUserByFbId = getUserByFbId;
exports.updateUser = updateUser;
