const { User } = require('../models/userModel');
const options = require('./optionHelpers');

const randPlanet = () => Math.floor(Math.random() * 10);

const addNewUser = (newUserObj) => {
  const userObj = Object.assign({ planet_id: randPlanet() }, newUserObj);
  User.build(userObj)
    .save()
    .catch((err) => { console.log(err); });
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
      ]);
    })
    .then(([gender, planet, personality]) => {
      userObj.gender = gender.self_identification;
      userObj.planet = planet.name;
      userObj.personality = personality.type;
      return userObj;
    })
    .catch(err => console.log(err));
};


exports.addNewUser = addNewUser;