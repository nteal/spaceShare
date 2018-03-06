const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Timeline = db.define('timeline', {
  range: Sequelize.STRING,
});

exports.Timeline = Timeline;
