import React, {Component} from 'react';

class Subject extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.title !== this.props.title) {
      return true;
    }
    return false;
  }
  render() {
    console.log('subject');
    return(
      <header>
        <h1>
          <a
            href="/"
            onClick={event => {
              event.preventDefault();
              this.props.onClickElement();
            }}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.desc}
      </header>
    );
  }
}

export default Subject;