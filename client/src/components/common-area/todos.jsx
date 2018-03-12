import React from 'react';
import MediaQuery from 'react-responsive';
import TodoListItem from './todo-list-item.jsx';

const Todos = (props) => {
  const { todos } = props;
  return (
    <div className="content-box">
      <MediaQuery minDeviceWidth={800}>
        <div className="mini-heading-box-top">
          <h5>Todos</h5>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="mini-heading-box-top-mobile">
          <h5>Todos</h5>
        </div>
      </MediaQuery>
      <div className="invisible-content-box">
        <div className="form-check">
          {todos.map(todo => (
            <TodoListItem todo={todo} key={todo.id}/>
          ))}
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="the add todo feature is currently being developed" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
