import React from 'react';
import './App.css';
import Header from './Header';
import Todo from './Todo';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Todo />
      </div>
    );
  }
}

export default App;
