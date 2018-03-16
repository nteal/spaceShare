const { Todo } = require('../models/todoModel');

const getTodosBySpaceId = spaceId => (
  Todo.findAll({ where: { space_id: spaceId } })
    .then(todos => todos.map(todo => todo.dataValues))
    .catch(err => console.log(err))
);

// expects a todoObj with a space_id property
// rturns the new todo object
const addTodo = todoObj => (
  Todo.create(todoObj)
    .then(newTodo => newTodo.dataValues)
    .catch(err => console.log(err))
);

// expects a todoId, returns destroyed todo
const deleteTodo = todoId => (
  Todo.findById(todoId)
    .then(todo => todo.destroy())
    .then(() => 'destroyed')
    .catch(err => console.log(err))
);

// takes todo obj and either creates, deletes, or updates todo
const updateTodo = (todoObj) => {
  if (todoObj.id && !todoObj.content) {
    // delete todo if given id but no content
    return deleteTodo(todoObj.id);
  } else if (!todoObj.id && todoObj.content && todoObj.space_id) {
    // create todo if given content but no id
    return addTodo(todoObj);
  } else if (todoObj.id && todoObj.content) {
    // update todo if given both id and content
    return Todo.findById(todoObj.id)
      .then(todo => todo.update(todoObj))
      .then(updated => updated.dataValues)
      .catch(err => console.log(err));
  }
  // let server know that we didn't meet one of the above conditions
  console.log('please give valid data for updating a todo!');
  return false;
};

const updateTodos = (spaceId, todos) => (
  Promise.all(todos.map(todo => updateTodo(Object.assign({ space_id: spaceId }, todo))))
    .then(updatedTodos => updatedTodos.filter(todo => todo !== 'destroyed'))
    .catch(err => console.log(err))
);

exports.getTodosBySpaceId = getTodosBySpaceId;
exports.updateTodo = updateTodo;
exports.updateTodos = updateTodos;
