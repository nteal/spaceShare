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

const SortableItem = SortableElement(({ value }) => (
  <li>
    <DragHandle />
    <TodoListItem todo={value} />
  </li>
));

const SortableList = SortableContainer(({ items, complete, toggleComplete }) => (
  <ul>
    {items.map((value, i) => (
      <SortableItem key={value.id} index={i} value={value} complete={complete} toggleComplete={toggleComplete} />
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
    this.setTodos(todos);
  }
  onSortEnd({ oldIndex, newIndex }) {
    const { items } = this.state;
    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });
  }
  setTodos(todos) {
    const complete = todos.filter(todo => todo.completed);
    const incomplete = todos.filter(todo => !todo.completed);
    this.setState({ items: todos, complete, incomplete });
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({ newTodo: value });
  }
  addTodo() {
    const { newTodo } = this.state;
    const newTodoObj = {
      content: newTodo,
      completed: false,
    };
    this.setState({ items: this.state.items.concat(newTodoObj) }, () => {
      this.submitTodos();
    });
  }
  toggleTodoComplete(todoId) {
    const { items } = this.state;
    const updatedItems = items.slice(0);
    for (let i = 0; i < updatedItems; i++) {
      const updatedItem = updatedItems[i];
      if (updatedItem.id === todoId) {
        updatedItem.complete = !updatedItem.complete;
        break;
      }
    }
    this.setState({ items: updatedItems }, () => {
      this.submitTodos();
    });
  }
  updateTodo(todoId, content) {
    // also deletes todos if content is empty
    const { items } = this.state;
    const updatedItems = items.slice(0);
    for (let i = 0; i < updatedItems; i++) {
      const updatedItem = updatedItems[i];
      if (updatedItem.id === todoId) {
        updatedItem.content = !updatedItem.content;
        break;
      }
    }
    this.setState({ items: updatedItems }, () => {
      this.submitTodos();
    });
  }
  submitTodos() {
    const { spaceId } = this.props;
    const { items } = this.state;
    Axios.post(`/api/updateTodos/${localStorage.getItem('id_token')}/${spaceId}`, items)
      .then(response => console.log('todos updated', response.data))
      .catch(error => console.error('error updating todos', error));
  }
  render() {
    const { complete, incomplete } = this.state;
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
          <div>
            <SortableList items={incomplete} onSortEnd={this.onSortEnd} useDragHandle />
          </div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Add a todo" onChange={this.handleChange} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Add</button>
            </div>
          </div>
          <div>
            <SortableList items={complete} onSortEnd={this.onSortEnd} toggleComplete={this.toggleTodoComplete} useDragHandle complete />
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
