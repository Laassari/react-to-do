import React from 'react';
import './App.css';
import Header from './Header';
import Todo from './Todo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: {
        items: [],
        completed: []
      }
    };

    this.updateTodos = this.updateTodos.bind(this);
  }

  updateTodos(todos) {
    this.setState(() => ({ todos }));
  }

  render() {
    return (
      <div className="container">
        <Header todos={this.state.todos} updateTodos={this.updateTodos} />
        <Todo todos={this.state.todos} updateTodos={this.updateTodos} />
      </div>
    );
  }
}

export default App;
