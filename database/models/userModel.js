const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');
const { Gender } = require('./genderModel');
const { Personality } = require('./personalityModel');
const { Sleep } = require('./sleepModel');
const { Planet } = require('./planetModel');

const User = db.define('user', {
  about: Sequelize.TEXT,
  image_url: Sequelize.STRING,
  name_first: Sequelize.STRING,
  name_last: Sequelize.STRING,
  phone: Sequelize.BIGINT,
  profession: Sequelize.STRING,
  email: Sequelize.STRING,
  fb_id: Sequelize.STRING,
  fb_link: Sequelize.STRING,
  fb_verified: Sequelize.BOOLEAN,
  searchable_work: Sequelize.BOOLEAN,
  searchable_live: Sequelize.BOOLEAN,
  birthdate: Sequelize.DATE,
});

// add foreign keys for many:1 relationships

Gender.hasMany(User, { foreignKey: 'gender_id' });
Sleep.hasMany(User, { foreignKey: 'sleep_id' });
Personality.hasMany(User, { foreignKey: 'personality_id' });
Planet.hasMany(User, { foreignKey: 'planet_id' });

exports.User = User;
