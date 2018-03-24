const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');
const { Space } = require('./spaceModel');

const Todo = db.define('todo', {
  content: Sequelize.STRING,
  completed: Sequelize.BOOLEAN,
  order: Sequelize.INTEGER,
});

Space.hasMany(Todo, { foreignKey: 'space_id', onDelete: 'CASCADE' });

exports.Todo = Todo;
