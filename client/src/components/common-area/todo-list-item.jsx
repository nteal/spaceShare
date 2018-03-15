import React from 'react';
import PropTypes from 'prop-types';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      isCompleted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange() {
    this.props.toggleComplete(id);
  }
  handleClick() {

  }
  render() {
    const { isComplete } = this.state;
    const { toggleComplete, complete, todo } = this.props;
    const { id, content, completed } = todo;
  
    const display = complete ? (
      <div>
        <input className="form-check-input" type="checkbox" id={id} checked={isComplete} handleChange={this.handleChange} />
        <label className="form-check-label complete-todo" htmlFor={id}>
          {content}
        </label>
      </div>
    ) : (
      <div>
        <input className="form-check-input" type="checkbox" id={id} checked={isComplete} handleChange={this.handleChange} />
        <label className="form-check-label incomplete-todo" htmlFor={id} onClick={this.handleClick} >
          {content}
        </label>
      </div>
    );
    return display;
  }
}

TodoListItem.propType = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    completed: PropTypes.bool,
  }),
};

TodoListItem.defaultProps = {
  todo: {
    id: 0,
    content: 'Add a todo!',
    completed: false,
  },
};

export default TodoListItem;
