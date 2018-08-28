import React from 'react';
import TodoItem from './TodoItem';
import Modal from './Modal';
import './Todo.css';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.todos.items,
      error: false,
      dragedItemIndex: false,
      markedTodos: this.props.todos.completed
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.markTodoComplete = this.markTodoComplete.bind(this);
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
    if (this.props.todos.items.indexOf(value) > -1) {
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

    const todos = [value, ...this.props.todos.items];
    const markedTodos = [false, ...this.props.todos.completed];
    this.props.updateTodos({ items: todos, completed: markedTodos });

    event.target.item.value = '';
  }

  deleteTodo(event, todo) {
    event.stopPropagation()
    
    const todos = [...this.props.todos.items];
    const markedTodos = [...this.props.todos.completed];
    todos.splice(todos.indexOf(todo), 1);
    markedTodos.splice(todos.indexOf(todo), 1);
    this.props.updateTodos({ items: todos, completed: markedTodos });
  }

  markTodoComplete(index, done) {
    const todos = [...this.props.todos.items];
    const markedTodos = [...this.props.todos.completed];
    markedTodos[index] = done;
    this.props.updateTodos({ items: todos, completed: markedTodos });
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
          {this.props.todos.items.length === 0 ? (
            <p>
              nothing to do
              <span
                style={{ display: 'contents' }}
                role="img"
                aria-label="ghost emoji"
              >
                {' '}
                👻
              </span>
            </p>
          ) : (
            this.props.todos.items.map((todo, index) => (
              <TodoItem
                handleDragStart={this.handleDragStart}
                handleDragEnter={this.handleDragEnter}
                handleDragLeave={this.handleDragLeave}
                markTodoComplete={this.markTodoComplete}
                index={index}
                deleteTodo={this.deleteTodo}
                key={todo}
                content={todo}
                completed={this.props.todos.completed[index]}
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
