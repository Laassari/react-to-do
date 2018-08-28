import React from 'react';

class TodoItem extends React.Component {
  render() {
    return (
      <p
        onDragOver={this.props.handleDragEnter}
        onDragStart={this.props.handleDragStart}
        onDragLeave={this.props.handleDragLeave}
        onClick={() =>
          this.props.markTodoComplete(this.props.index, !this.props.completed)
        }
        draggable="true"
        data-index={this.props.index}
      >
        {this.props.content} is marked: {this.props.completed.toString()}
        <button onClick={() => this.props.deleteTodo(this.props.content)}>
          delete
        </button>
      </p>
    );
  }
}

export default TodoItem;
