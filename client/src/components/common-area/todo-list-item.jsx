import React from 'react';
import PropTypes from 'prop-types';
import DeleteCircle from 'mdi-react/DeleteCircleIcon.js';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      isComplete: false,
      value: '',
    };
    this.setTodo = this.setTodo.bind(this);
    this.setComplete = this.setComplete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    const { complete } = this.props;
    this.setComplete(complete);
    this.setTodo();
  }
  setTodo() {
    this.setState({ value: this.props.todo.content });
  }
  setComplete(isComplete) {
    this.setState({ isComplete });
  }
  handleChange() {
    const { todo, toggleComplete } = this.props;
    const { id } = todo;
    toggleComplete(id);
    this.setState({ isComplete: !this.state.isComplete });
  }
  handleClick() {
    this.setState({ editing: true });
  }
  handleTextChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }
  handleEnter(event) {
    const { updateTodo, todo } = this.props;
    const { value } = this.state;
    if (event.key === 'Enter') {
      updateTodo(todo.id, value);
      this.toggleEdit();
    }
  }
  toggleEdit() {
    this.setState({ editing: false });
  }
  handleDelete() {
    const { updateTodo, todo } = this.props;
    updateTodo(todo.id, null);
  }
  render() {
    const { isComplete, editing, value } = this.state;
    const { todo, complete } = this.props;
    const { id, content } = todo;

    let display;
    if (editing) {
      display = (
        <input
          type="text"
          className="form-control todo-input"
          aria-label="enter new todo or edit existing"
          placeholder="Edit your todo"
          value={value}
          onChange={this.handleTextChange}
          onKeyPress={this.handleEnter}
          onBlur={this.toggleEdit}
        />
      );
    } else if (complete) {
      display = (
        <label className="form-check-label complete-todo" htmlFor={id}>
          {content}
        </label>
      );
    } else {
      display = (
        <label className="form-check-label incomplete-todo" htmlFor={id} onClick={this.handleClick}>
          {content}
        </label>
      );
    }

    return (
      <div className="row pl-4 pr-3 d-flex align-items-center justify-content-between">
        <div>
          <input className="form-check-input" type="checkbox" id={id} checked={isComplete} onChange={this.handleChange} />
          {display}
        </div>
        <DeleteCircle className="mdi-btn" onClick={this.handleDelete} height={25} width={25} fill="#6F5BC0" />
      </div>
    );
  }
}

TodoListItem.propType = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    completed: PropTypes.bool,
  }),
  complete: PropTypes.bool,
  toggleComplete: PropTypes.func,
  updateTodo: PropTypes.func,
};

TodoListItem.defaultProps = {
  todo: {
    id: 0,
    content: 'Add a todo!',
    completed: false,
  },
  complete: false,
  toggleComplete: null,
  updateTodo: null,
};

export default TodoListItem;
