// user helpers:
const { addNewUser } = require('./userHelpers');
const { getUserByFbId } = require('./userHelpers');
const { getUserById } = require('./userHelpers');
const { updateUser } = require('./userHelpers');
const { userInDb } = require('./userHelpers');
// options helpers:
const { addGender } = require('./genderHelpers');
const { getGenders } = require('./optionHelpers');
const { getPlanets } = require('./optionHelpers');

// user exports:
exports.addNewUser = addNewUser;
exports.getUserByFbId = getUserByFbId;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.userInDb = userInDb;
// options exports:
exports.addGender = addGender;
exports.getGenders = getGenders;
exports.getPlanets = getPlanets;
