import React from 'react';
import TodoItem from './TodoItem';
import Modal from './Modal';
import './Todo.css';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      error: false,
      dragedItemIndex: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  }

  componentDidUpdate() {
    if (this.state.error) {
      //remove the modal
      setTimeout(() => {
        this.setState(() => ({ error: false }));
      }, 1500);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const value = event.target.item.value.trim();
    if (this.state.todos.indexOf(value) > -1) {
      this.setState(() => ({
        error: 'Entry already exists'
      }));
      event.target.item.value = '';
      return;
    }

    //reset errors
    this.setState(() => ({ error: false }));

    if (value.length === 0) {
      this.setState(() => ({
        error: 'Entry cannot be empty'
      }));
      return;
    }

    this.setState(prevState => {
      const todos = [value, ...prevState.todos];
      return { todos };
    });
    event.target.item.value = '';
  }

  deleteTodo(todo) {
    this.setState(prevState => {
      const todos = [...prevState.todos];
      todos.splice(todos.indexOf(todo), 1);
      return {
        todos
      };
    });
  }

  handleDragStart(event) {
    const itemIndex = event.target.dataset.index;
    this.setState(() => ({ dragedItemIndex: itemIndex }));
  }

  handleDragEnter(event) {
    event.preventDefault();
    if (event.target.dataset.index !== this.state.dragedItemIndex)
      event.target.classList.add('dragOver');

    event.stopPropagation();
  }

  handleDragLeave(event) {
    event.target.classList.remove('dragOver');
    event.stopPropagation();
  }

  handleDrop(event) {
    event.target.classList.remove('dragOver');

    const destIndex = +event.target.dataset.index;

    //move the dragedItem to it's new place in the array
    this.setState(currState => {
      const todos = [...currState.todos];

      const dragedItem = todos.slice(
        currState.dragedItemIndex,
        currState.dragedItemIndex + 1
      )[0];

      const tempName = `__temporary__${Math.random()}`;
      todos[currState.dragedItemIndex] = tempName;
      todos.splice(destIndex + 1, 0, dragedItem);
      todos.splice(todos.indexOf(tempName), 1);
      return { todos };
    });
  }

  render() {
    return (
      <div className="todo-app">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="item" placeholder="Add a Todo" />
        </form>
        <div className="items" onDrop={this.handleDrop}>
          {this.state.todos.length === 0 ? (
            <p>
              nothing to do
              <span
                style={{ display: 'contents' }}
                role="img"
                aria-label="ghost emoji"
              >
                👻
              </span>
            </p>
          ) : (
            this.state.todos.map((todo, index) => (
              <TodoItem
                handleDragStart={this.handleDragStart}
                handleDragEnter={this.handleDragEnter}
                handleDragLeave={this.handleDragLeave}
                index={index}
                deleteTodo={this.deleteTodo}
                key={todo}
                content={todo}
              />
            ))
          )}
          {this.state.error && (
            <Modal id="modal" textError={this.state.error} />
          )}
        </div>
      </div>
    );
  }
}

export default Todo;
