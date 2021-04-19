import React, { Component } from 'react';

class Control extends Component {
  typeSelector = event => {
    event.preventDefault();
    this.props.onClickBtn(event.target.name);
  }
  render() {
    return(
      <article>
        <input
          type="button"
          name="create"
          value="Create"
          onClick={this.typeSelector}
        />
        <input
          type="button"
          name="update"
          value="Update"
          onClick={this.typeSelector}
        />
        <input
          type="button"
          name="delete"
          value="Delete"
          onClick={this.typeSelector}
        />
      </article>
    );
  }
}

export default Control;