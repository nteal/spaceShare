const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Sleep = db.define('sleep', {
  schedule: Sequelize.STRING,
});

exports.Sleep = Sleep;
