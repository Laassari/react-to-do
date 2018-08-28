import React from 'react';
import UserLogin from './UserLogin';
import './Header.css';

const Header = props => (
  <header>
    <h1>Todo App</h1>
    <UserLogin todos={props.todos} updateTodos={props.updateTodos} />
  </header>
);

export default Header;
