const db = require('../../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Sleep = db.define('Sleep', {
  schedule: Sequelize.STRING,
});

exports.Sleep = Sleep;
