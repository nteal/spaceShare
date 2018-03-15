const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

// require prefil preferences
const { Purpose } = require('./purposeModel');
const { Timeline } = require('./timelineModel');
const { Pet } = require('./petModel');
const { Smoking } = require('./smokingModel');

// require other dependencies:
// removed for mvp
// const { Neighborhood } = require('./neighborhoodModel');
const { Image } = require('./imageModel');
const { Amenity } = require('./amenityModel');
const { User } = require('./userModel');

// define space
const Space = db.define('space', {
  capacity: Sequelize.INTEGER,
  city: Sequelize.STRING,
  cost: Sequelize.DECIMAL(12, 2),
  description: Sequelize.TEXT,
  ground_rules: Sequelize.TEXT,
  lat: Sequelize.DECIMAL(9, 7),
  lng: Sequelize.DECIMAL(10, 7),
  main_image: Sequelize.TEXT,
  name: Sequelize.TEXT,
  neighborhood: Sequelize.STRING,
  open: Sequelize.BOOLEAN,
  owner_fb_id: Sequelize.STRING,
  state: Sequelize.STRING,
  street_address: Sequelize.STRING,
  street_address2: Sequelize.STRING,
  zip: Sequelize.STRING,
});

// add relationships from options
Purpose.hasMany(Space, { foreignKey: 'purpose_id' });
Timeline.hasMany(Space, { foreignKey: 'timeline_id' });
Pet.hasMany(Space, { foreignKey: 'pet_id' });
Smoking.hasMany(Space, { foreignKey: 'smoking_id' });

// add other relationships  
// removed for mvp
// Neighborhood.hasMany(Space, { foreignKey: 'neighborhood_id' });
Space.hasMany(Image, { foreignKey: 'space_id' });
Space.hasMany(Amenity, { foreignKey: 'space_id' });
// targetKey doesn't work......
// User.hasOne(Space, { foreignKey: 'owner_fb_id', targetKey: 'fb_id'});

exports.Space = Space;
