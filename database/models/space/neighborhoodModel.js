const db = require('../../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Neighborhood = db.define('neighborhood', {
  name: Sequelize.STRING,
});

exports.Neighborhood = Neighborhood;
