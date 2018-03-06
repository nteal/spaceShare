const db = require('../sequelize.js').sequelize;
const Sequelize = require('sequelize');
const { Space } = require('./spaceModel');

const Todo = db.define('todo', {
  content: Sequelize.STRING,
  completed: Sequelize.BOOLEAN,
});

Space.hasMany(Todo, { foreignKey: 'space_id' });

exports.Todo = Todo;
