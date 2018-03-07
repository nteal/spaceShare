const { User } = require('../models/userModel');

const addNewUser = (newUserObj) => {
  User.build(newUserObj)
    .save()
    .catch((err) => { console.log(err); });
};

exports.addNewUser = addNewUser;
