const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');
const { User } = require('./userModel');

const OtherLink = db.define('other_link', {
  url: Sequelize.STRING,

});

// add foreign keys for 1:1 relationships

User.hasMany(OtherLink, { foreignKey: 'user_id' });

exports.OtherLink = OtherLink;
