import React, { Component } from 'react';

class ReadContent extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.title !== this.props.title) {
      return true;
    }
    return false;
  }
  render () {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

export default ReadContent;
