import React, {Component} from 'react';

class Modify extends Component {
  render() {
    console.log('modify');
    return(
      <section>
        <input
          type = "button"
          name = "create"
          value = "create"
          onClick = {event => {
            this.props.onClickButton(event.target.name);
          }}
        ></input>
        <input
          type = "button"
          name = "update"
          value = "update"
          onClick = {event => {
            this.props.onClickButton(event.target.name);
          }}
        ></input>
        <input
          type = "button"
          name = "delete"
          value = "delete"
          onClick = {event => {
            this.props.onClickButton(event.target.name);
          }}
        ></input>
      </section>
    );
  }
}

export default Modify;