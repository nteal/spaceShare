const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Pet = db.define('pet', {
  location: Sequelize.STRING,
});

exports.Pet = Pet;
