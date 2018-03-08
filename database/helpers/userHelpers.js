const { User } = require('../models/userModel');

const randPlanet = () => Math.floor(Math.random() * 10);

const addNewUser = (newUserObj) => {
  const userObj = Object.assign({ planet_id: randPlanet() }, newUserObj);
  User.build(userObj)
    .save()
    .catch((err) => { console.log(err); });
};

exports.addNewUser = addNewUser;
