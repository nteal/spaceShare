const { Todo } = require('../models/todoModel');

const getTodosBySpaceId = (spaceId) => (
  Todo.findAll({ where: { space_id: spaceId } })
    .then(todos => todos.map(todo => todo.dataValues))
    .catch(err => console.log(err))
);

exports.getTodosBySpaceId = getTodosBySpaceId;