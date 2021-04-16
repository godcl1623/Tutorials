import React, { Component } from 'react';

class CreateContent extends Component {
  render () {
    return (
      <article>
        <h2>Create</h2>
        <form
          action="/submit_process"
          method="post"
          onSubmit={event => {
            const target = event.target;
            event.preventDefault();
            this.props.onSubmitAction(target.title.value, target.desc.value);
          }}
        >
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title"
            ></input>
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="Description"
            ></textarea>
          </p>
          <p>
            <input
              type="submit"
              name="submit"
              value="submit"
            ></input>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
