const db = require('../../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Smoking = db.define('smoking', {
  location: Sequelize.STRING,
});

exports.Smoking = Smoking;
