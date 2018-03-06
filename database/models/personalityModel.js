const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');


const Personality = db.define('personality', {
  type: Sequelize.STRING,
});

exports.Personality = Personality;
