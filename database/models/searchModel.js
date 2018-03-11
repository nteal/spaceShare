const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

// require user preferences
const { Gender } = require('./genderModel');
const { Personality } = require('./personalityModel');
const { Sleep } = require('./sleepModel');

// require options preferences
const { Purpose } = require('./purposeModel');
const { Timeline } = require('./timelineModel');
const { Pet } = require('./petModel');
const { Smoking } = require('./smokingModel');

// require user
const { User } = require('./userModel');

const Search = db.define('search', {
  price_min: Sequelize.DECIMAL(12, 2),
  price_max: Sequelize.DECIMAL(12, 2),
  age_min: Sequelize.INTEGER,
  age_max: Sequelize.INTEGER,
  location_specificity: Sequelize.STRING,
  location_search: Sequelize.STRING,
  zip: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  include_people: Sequelize.BOOLEAN,
  fb_id: Sequelize.STRING,
});

// add relationships for many:1 relationships
// sequelize doesn't support targetKeys for hasmany.............
// User.hasMany(Search, { foreignKey: 'fb_id', targetKey: 'fb_id' });
// Gender.hasMany(Search, { foreignKey: 'gender_id' });
Sleep.hasMany(Search, { foreignKey: 'sleep_id' });
Personality.hasMany(Search, { foreignKey: 'personality_id' });

// add relationships from prefils

Purpose.hasMany(Search, { foreignKey: 'purpose_id' });
Timeline.hasMany(Search, { foreignKey: 'timeline_id' });
Pet.hasMany(Search, { foreignKey: 'pet_id' });
Smoking.hasMany(Search, { foreignKey: 'smoking_id' });

exports.Search = Search;
