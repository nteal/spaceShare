const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Purpose = db.define('purpose', {
  type: Sequelize.STRING,
});

exports.Purpose = Purpose;
