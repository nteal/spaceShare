const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');

const Image = db.define('image', {
  description: Sequelize.TEXT,
  url: Sequelize.STRING,
});

exports.Image = Image;
