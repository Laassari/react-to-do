import React from 'react';
import checked from './checked.svg';
import unchecked from './unchecked.svg';

const TodoItem = props => {
  const ImgIcon = () => (
    <img src={props.completed ? checked : unchecked} alt="" />
  );
  const checkedTextStyles = {
    opacity: 0.5
  };

  return (
    <p
      onDragOver={props.handleDragEnter}
      onDragStart={props.handleDragStart}
      onDragLeave={props.handleDragLeave}
      onClick={() => props.markTodoComplete(props.index, !props.completed)}
      draggable="true"
      data-index={props.index}
      style={props.completed ? checkedTextStyles : null}
    >
      <ImgIcon />
      {props.content}
      <button onClick={event => props.deleteTodo(event, props.content)}>
        delete
      </button>
    </p>
  );
};

export default TodoItem;
