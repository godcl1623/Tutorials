import React, { Component } from 'react';

class Subject extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.title !== this.props.title) {
      return true;
    }
    return false;
  }
  render(){
    return (
      <header>
        <h1><a href="/" onClick={function(event) {
          event.preventDefault();
          this.props.onClickElement(event);
        }.bind(this)}>{this.props.title}</a></h1>
        {this.props.text}
      </header>
    );
  }
}

export default Subject;