const db = require('../sequelize.js').sequelize;

const UserSpace = db.define('user_space', {});

exports.UserSpace = UserSpace;