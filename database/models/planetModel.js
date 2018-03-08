const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Planet = db.define('planet', {
  name: Sequelize.STRING,
});

exports.Planet = Planet;
