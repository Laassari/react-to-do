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
      <p onClick={this.markDone}>
        {this.props.content} is marked: {this.state.isDone.toString()}
        <b onClick={this.deletItem}>close</b>
      </p>
    );
  }
}

export default TodoItem;
