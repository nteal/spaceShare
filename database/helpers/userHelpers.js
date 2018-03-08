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
      ]);
    })
    .then(([gender]) => {
      userObj.gender = gender.self_identification;
      return userObj;
    })
    .catch(err => console.log(err));
};

exports.addNewUser = addNewUser;
