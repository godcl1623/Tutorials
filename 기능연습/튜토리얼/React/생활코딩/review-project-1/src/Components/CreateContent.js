import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    return(
      <article>
        <h1>Create</h1>
        <form
          action="/submit_progress"
          method="post"
          onSubmit={event => {
            const target = event.target;
            event.preventDefault();
            this.props.onSubmitContent(target.title.value, target.desc.value);
          }}
        >
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title"
            />
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="Description"
            />
          </p>
          <p>
            <input
              type="submit"
              name="submit"
              value="Submit"
            />
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;