import React from 'react';
import TodoItem from './TodoItem';
import Modal from './Modal';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      error: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
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

    if (value.length === 0) {
      this.setState(() => ({
        error: 'Entry cannot be empty'
      }));
      return;
    }

    this.setState(prevState => {
      const todos = [...prevState.todos].concat(value);
      return { todos };
    });
    event.target.item.value = '';
  }

  deleteTodo(todo) {
    this.setState(prevState => {
      const todos = [...prevState.todos];
      todos.splice(todos.indexOf(todo), 1);
      return { todos };
    });
  }

  render() {
    return (
      <div className="todo-app">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="item" autoComplete="off" />
        </form>
        <div className="items">
          {this.state.todos.length === 0 ? (
            <p>nothing to do</p>
          ) : (
            this.state.todos
              .reverse()
              .map(todo => (
                <TodoItem
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
