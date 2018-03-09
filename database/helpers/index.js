const { addNewUser } = require('./userHelpers');
const { getUserByFbId } = require('./userHelpers');
const { getUserById } = require('./userHelpers');
const { updateUser } = require('./userHelpers');

exports.addNewUser = addNewUser;
exports.getUserByFbId = getUserByFbId;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
