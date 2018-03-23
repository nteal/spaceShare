import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import Drag from 'mdi-react/DragIcon.js';
import TodoListItem from './todo-list-item.jsx';

// const DragHandle = SortableHandle(() => <Drag height={30} width={30} fill="#A4FFA2" />)

const DragHandle = SortableHandle(() => (
  <svg width="30" height="30">
    <defs>
      <linearGradient id="linear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#05a" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0a5" />
      </linearGradient>
    </defs>

    <Drag height={30} width={30} fill="url(#linear)" />
  </svg>
));

const SortableItem = SortableElement(({ value, complete, toggleComplete, updateTodo }) => (
  <li className="list-group-item pt-1 pr-1 pb-1 pl-1">
    <div className="row d-flex align-items-center ml-0">
      <div className="flex-column">
        <DragHandle />
      </div>
      <div className="col">
        <TodoListItem todo={value} complete={complete} toggleComplete={toggleComplete} updateTodo={updateTodo} />
      </div>
    </div>
  </li>
));

const SortableList = SortableContainer(({ items, complete, toggleComplete, updateTodo }) => (
  <ul className="list-group">
    {items.map((value, i) => (
      <SortableItem key={value.id} index={i} value={value} complete={complete} toggleComplete={toggleComplete} updateTodo={updateTodo} />
    ))}
  </ul>
));

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      complete: [],
      incomplete: [],
      value: '',
      newTodo: '',
    };
    this.onSortEnd = this.onSortEnd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleTodoComplete = this.toggleTodoComplete.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }
  onSortEnd({ oldIndex, newIndex }) {
    const { todos, setTodos } = this.props;
    const updatedOrder = arrayMove(todos, oldIndex, newIndex);
    setTodos(updatedOrder, () => {
      console.log(this.state);
    });
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({ newTodo: value });
  }
  addTodo() {
    const { newTodo } = this.state;
    const { todos, setTodos, submitTodos } = this.props;
    const newTodoObj = {
      content: newTodo,
      completed: false,
    };
    const newTodos = todos.concat(newTodoObj);
    this.setState({ newTodo: '' });
    setTodos(newTodos, () => {
      submitTodos();
      console.log('todos', this.state);
    });
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.addTodo();
    }
  }
  toggleTodoComplete(todoId) {
    const { todos, setTodos, submitTodos } = this.props;
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos, () => {
      submitTodos();
      console.log(this.state);
    });
  }
  updateTodo(todoId, content) {
    const { todos, submitTodos, setTodos } = this.props;
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.content = content;
      }
      return todo;
    });
    setTodos(updatedTodos, () => {
      console.log(this.state);
      submitTodos();
    });
  }
  render() {
    const { newTodo } = this.state;
    const { complete, incomplete } = this.props;
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
        <div className="pl-1 pr-1 pb-1 pt-2">
          <div>
            <SortableList items={incomplete} onSortEnd={this.onSortEnd} toggleComplete={this.toggleTodoComplete} updateTodo={this.updateTodo} useDragHandle lockAxis="y" />
          </div>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Add a todo" onChange={this.handleChange} value={newTodo} onKeyPress={this.handleKeyPress} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary pb-0" type="button" onClick={this.addTodo}>
                <i className="material-icons">add</i>
              </button>
            </div>
          </div>
          <div>
            <SortableList items={complete} onSortEnd={this.onSortEnd} toggleComplete={this.toggleTodoComplete} updateTodo={this.updateTodo} useDragHandle lockAxis="y" complete />
          </div>
        </div>
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array,
  complete: PropTypes.array,
  incomplete: PropTypes.array,
  setTodos: PropTypes.func,
  submitTodos: PropTypes.func,
};

Todos.defaultProps = {
  todos: [
    {
      id: 0,
      content: 'Add a todo!',
      completed: false,
    },
    {
      id: 1,
      content: 'Add another todo!',
      completed: false,
    },
  ],
  complete: [],
  incomplete: [],
  setTodos: null,
  submitTodos: null,
};

export default Todos;
