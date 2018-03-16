import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
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
      <DragHandle />
      <TodoListItem todo={value} complete={complete} toggleComplete={toggleComplete} updateTodo={updateTodo} />
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
    this.setTodos = this.setTodos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodoComplete = this.toggleTodoComplete.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.submitTodos = this.submitTodos.bind(this);
  }
  componentDidMount() {
    const { todos } = this.props;
    this.setTodos(todos, () => console.log(todos));
  }
  onSortEnd({ oldIndex, newIndex }) {
    const { items } = this.state;
    const updatedOrder = arrayMove(items, oldIndex, newIndex);
    this.setTodos(updatedOrder, () => {
      console.log(this.state);
    });
  }
  setTodos(todos, callback) {
    const complete = todos.filter(todo => todo.completed);
    const incomplete = todos.filter(todo => !todo.completed);
    this.setState({ items: todos, complete, incomplete }, callback);
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({ newTodo: value });
  }
  addTodo() {
    const { newTodo, items } = this.state;
    const newTodoObj = {
      id: 1,
      content: newTodo,
      completed: false,
    };
    const newTodos = items.concat(newTodoObj);
    this.setState({ newTodo: '' });
    this.setTodos(newTodos, () => {
      this.submitTodos();
      console.log('todos', this.state);
    });
  }
  toggleTodoComplete(todoId) {
    const { items } = this.state;
    const updatedItems = items.map((item) => {
      if (item.id === todoId) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.setTodos(updatedItems, () => {
      this.submitTodos();
      console.log(this.state);
    });
  }
  updateTodo(todoId, content) {
    // also deletes todos if content is empty
    const { items } = this.state;
    const updatedItems = items.map((item) => {
      if (item.id === todoId) {
        item.content = content;
      }
      return item;
    });
    this.setState({ items: updatedItems }, () => {
      console.log(this.state);
      this.submitTodos();
    });
  }
  submitTodos() {
    const { spaceId } = this.props;
    const { items } = this.state;
    // Axios.post(`/api/updateTodos/${localStorage.getItem('id_token')}/${spaceId}`, items)
    //   .then(response => console.log('todos updated', response.data))
    //   .catch(error => console.error('error updating todos', error));
  }
  render() {
    const { complete, incomplete, newTodo } = this.state;
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
            <input type="text" className="form-control" placeholder="Add a todo" onChange={this.handleChange} value={newTodo} />
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
  spaceId: PropTypes.number,
  todos: PropTypes.array,
};

Todos.defaultProps = {
  spaceId: null,
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
};

export default Todos;
