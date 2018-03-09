const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

// require prefil preferences
const { Purpose } = require('./purposeModel');
const { Timeline } = require('./timelineModel');
const { Pet } = require('./petModel');
const { Smoking } = require('./smokingModel');

// require other dependencies:
const { Neighborhood } = require('./neighborhoodModel');
const { Image } = require('./imageModel');
const { User } = require('./userModel');

// define space
const Space = db.define('space', {
  name: Sequelize.TEXT,
  description: Sequelize.TEXT,
  cost: Sequelize.DECIMAL(12, 2),
  capacity: Sequelize.INTEGER,
  open: Sequelize.BOOLEAN,
  ground_rules: Sequelize.TEXT,
  street_address: Sequelize.STRING,
  city: Sequelize.STRING,
  zip: Sequelize.STRING,
  state: Sequelize.STRING,
});

// add relationships from options
Purpose.hasMany(Space, { foreignKey: 'purpose_id' });
Timeline.hasMany(Space, { foreignKey: 'timeline_id' });
Pet.hasMany(Space, { foreignKey: 'pet_id' });
Smoking.hasMany(Space, { foreignKey: 'smoking_id' });

// add other relationships
Neighborhood.hasMany(Space, { foreignKey: 'neighborhood_id' });
Space.hasMany(Image, { foreignKey: 'space_id' });
Image.hasOne(Space, { as: 'mainImage', foreignKey: 'main_image_id', constraints: false });
User.hasOne(Space, { foreignKey: 'owner_id' });

exports.Space = Space;
