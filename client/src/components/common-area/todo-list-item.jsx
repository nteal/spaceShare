import React from 'react';

const TodoListItem = (props) => {
  const { id, content, completed } = props.todo;
  return (
    <div>
      <input className="form-check-input" type="checkbox" id={id} />
      <label className="form-check-label" htmlFor={id}>{content}
      </label>
    </div>
  );
};

export default TodoListItem;
