const options = require('./optionHelpers');
const { User } = require('../models/userModel');
const { getLinksByUser } = require('./userLinksHelpers');
const { getZodiac } = require('./zodiacHelpers');
const { updateLinksForUser } = require('./userLinksHelpers');
const createNexmo = require('../../server/chatHelp').createUser;
const moment = require('moment');
const { Op } = require('sequelize');


const randPlanet = () => {
  const planetId = Math.floor(Math.random() * 10);
  console.log('*****************planet id: should be 1-9', planetId);
  return planetId;
};

const getAge = date => moment().diff(date, 'years');

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


const updateUser = newUserData => (
  // having multiple links doesn't allow me to include it in .then chaining
  updateLinksForUser(newUserData.id, newUserData.links)
    .then(() => User.findById(newUserData.id))
    .then(user => user.update(newUserData))
    .then(updatedUser => getUserById(updatedUser.id))
    .catch(err => console.log(err))
);

const addNewUser = (newUserObj) => {
  const userObj = newUserObj ? Object.assign({ planet_id: randPlanet() }, newUserObj) : {};

  // create defaults:
  userObj.about = newUserObj.about || '';
  userObj.image_url = newUserObj.image_url || '';
  userObj.name_first = newUserObj.name_first || '';
  userObj.name_last = newUserObj.name_last || '';
  userObj.phone = newUserObj.phone || 0;
  userObj.profession = newUserObj.profession || '';
  userObj.email = newUserObj.email || '';
  userObj.fb_id = newUserObj.fb_id || '';
  userObj.fb_link = newUserObj.fb_link || (newUserObj.fb_id && `https://facebook.com/${newUserObj.fb_id}`) || '';
  userObj.fb_verified = newUserObj.fb_verified || false;
  userObj.searchable_work = newUserObj.searchable_work || false;
  userObj.searchable_live = newUserObj.searchable_live || false;
  userObj.birthdate = newUserObj.birthdate || new Date(); // YYYY-MM-DD HH:MM:SS
  userObj.gender_id = newUserObj.gender_id || 3;
  userObj.sleep_id = newUserObj.sleep_id || 3;
  userObj.personality_id = newUserObj.personality_id || 3;
  userObj.planet_id = userObj.planet_id || 3;

  return User.findOrCreate({ where: { fb_id: userObj.fb_id }, defaults: userObj })
    .then(newUser => (
      Promise.all([
        createNexmo(`${newUser[0].dataValues.id}`, newUser[0].dataValues.name_first, newUser[0].dataValues.name_last),
        newUser[0],
      ])
    ))
    .then(([nexmoRes, newUser]) => {
      const nexmo_id = nexmoRes.id;
      return newUser.update({ nexmo_id });
    })
    .then(newUser => getUserById(newUser.id))
    .catch(err => console.log(err));
};

const getUserIdByFbId = fbId => (
  User.findOne({ where: { fb_id: fbId } })
    .then(user => user.dataValues.id)
    .catch(err => console.log(err))
);

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

const getUserPublic = (id) => {
  return getUserById(id)
    .then((user) => {
      const publicData = {};
      publicData.gender = user.gender;
      publicData.links = user.links;
      publicData.name_first = user.name_first;
      publicData.name_last = user.name_last;
      publicData.nexmo_id = user.nexmo_id;
      publicData.profession = user.profession;
      publicData.personality = user.personality;
      publicData.sleep = user.sleep;
      publicData.zodiac = user.zodiac;
      publicData.about = user.about;
      publicData.image_url = user.image_url;
      publicData.fb_link = user.fb_link;
      return publicData;
    })
    .catch(err => console.log(err));
};

const userInDb = fbId => (
  User.findOne({ where: { fb_id: fbId } })
    .then(user => (!!user))
    .catch(err => console.log(err))
);


const getNexmoIdByFbId = fb_id => (
  User.findOne({ where: { fb_id } })
    .then(user => user.dataValues.nexmo_id)
    .catch(err => console.log(err))
);

const searchUsersByName = nameArr => (
  // TODO: search for all users where name_first or name_last are in nameArr
  User.findAll({
    where: {
      $or: [
        { name_first: { [Op.in]: nameArr } },
        { name_last: { [Op.in]: nameArr } },
      ],
    },
    attributes: ['name_first', 'name_last', 'fb_id', 'fb_link', 'image_url'],
  })
    .then(users => (
      users.map(user => user.dataValues)
    ))
    .catch(err => console.log(err))
);

exports.addNewUser = addNewUser;
exports.getUserById = getUserById;
exports.getUserByFbId = getUserByFbId;
exports.updateUser = updateUser;
exports.userInDb = userInDb;
exports.getUserIdByFbId = getUserIdByFbId;
exports.getAge = getAge;
exports.getUserPublic = getUserPublic;
exports.getNexmoIdByFbId = getNexmoIdByFbId;
exports.searchUsersByName = searchUsersByName;
