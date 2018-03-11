const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');
// const { Space } = require('./spaceModel');

const Amenity = db.define('amenity', {
  text: Sequelize.STRING,
});

exports.Amenity = Amenity;
