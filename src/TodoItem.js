import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false
    };

    this.markDone = this.markDone.bind(this);
    this.deletItem = this.deletItem.bind(this);
  }

  deletItem() {
    this.props.deleteTodo(this.props.content);
  }

  markDone() {
    this.setState(prevState => ({ isDone: !prevState.isDone }));
  }

  render() {
    return (
      <p
        onDragOver={this.props.handleDragEnter}
        onDragStart={this.props.handleDragStart}
        onDragLeave={this.props.handleDragLeave}
        onClick={this.markDone}
        draggable="true"
        data-index={this.props.index}
      >
        {this.props.content} is marked: {this.state.isDone.toString()}
        <button onClick={this.deletItem}>delete</button>
      </p>
    );
  }
}

export default TodoItem;
