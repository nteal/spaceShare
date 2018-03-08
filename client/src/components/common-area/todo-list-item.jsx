import React from 'react';

const TodoListItem = (props) => {
  return (
    <div>
      <input className="form-check-input" type="checkbox" id={props.todo} />
      <label className="form-check-label" htmlFor={props.key}>{props.todo}
      </label>
    </div>
  );
};

export default TodoListItem;
