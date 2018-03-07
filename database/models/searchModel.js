const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

// require user preferences
const { Gender } = require('./genderModel');
const { Personality } = require('./personalityModel');
const { Sleep } = require('./sleepModel');

// require prefil preferences
const { Purpose } = require('./purposeModel');
const { Timeline } = require('./timelineModel');
const { Pet } = require('./petModel');
const { Smoking } = require('./smokingModel');

const Search = db.define('search', {
  about: Sequelize.TEXT,
  price_min: Sequelize.DECIMAL(12, 2),
  price_max: Sequelize.DECIMAL(12, 2),
  location_specificity: Sequelize.STRING,
  location_search: Sequelize.STRING,
  zip: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  include_people: Sequelize.BOOLEAN,

});

// add relationships for many:1 relationships

Gender.hasMany(Search, { foreignKey: 'gender_id' });
Sleep.hasMany(Search, { foreignKey: 'sleep_id' });
Personality.hasMany(Search, { foreignKey: 'personality_id' });

// add relationships from prefils

Purpose.hasMany(Search, { foreignKey: 'purpose_id' });
Timeline.hasMany(Search, { foreignKey: 'timeline_id' });
Pet.hasMany(Search, { foreignKey: 'pet_id' });
Smoking.hasMany(Search, { foreignKey: 'smoking_id' });

exports.Search = Search;
