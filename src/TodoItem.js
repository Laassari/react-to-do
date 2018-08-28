import React from 'react';

const TodoItem = props => (
  <p
    onDragOver={props.handleDragEnter}
    onDragStart={props.handleDragStart}
    onDragLeave={props.handleDragLeave}
    onClick={() => props.markTodoComplete(props.index, !props.completed)}
    draggable="true"
    data-index={props.index}
  >
    {props.content} is marked: {props.completed.toString()}
    <button onClick={() => props.deleteTodo(props.content)}>delete</button>
  </p>
);

export default TodoItem;
