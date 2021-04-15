import React, { Component } from 'react';

class Subject extends Component {
  render(){
    return (
      <header>
        <h1><a href="/" onClick={function(event) {
          this.props.onClickElement(event);
        }.bind(this)}>{this.props.title}</a></h1>
        {this.props.text}
      </header>
    );
  }
}

export default Subject;