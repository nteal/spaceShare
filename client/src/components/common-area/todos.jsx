import React from 'react';
import TodoListItem from './todo-list-item.jsx';

const Todos = (props) => {
  return (
    <div>
      <h4>Todos</h4>
      <div className="form-check">
        {props.todos.map(todo => (
          <TodoListItem todo={todo} />
        ))}
      </div>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="the add todo feature is currently being developed" />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">Add</button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
