import React, {Component} from 'react';

class ReadContent extends Component {
  render() {
    console.log('read');
    return(
      <article>
        <h1>
          {this.props.title}
        </h1>
        {this.props.desc}
      </article>
    );
  }
}

export default ReadContent;