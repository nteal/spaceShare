const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Image = db.define('image', {
  name: Sequelize.STRING,
});

exports.Image = Image;
