const db = require('../../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Gender = db.define('gender', {
  self_identification: Sequelize.STRING,
});

exports.Gender = Gender;
