import React, {Component} from 'react';

class CreateContent extends Component {
  render() {
    console.log('create')
    return(
      <article>
        <h1>
          Create
        </h1>
        <form
          action = "/submit_process"
          method = "post"
          onSubmit = {event => {
            event.preventDefault();
            this.props.onClickSubmitBtn(event.target.title.value, event.target.desc.value);
          }}
        >
          <p>
            <input
              type = "text"
              name = "title"
              placeholder = "Title"
            ></input>
          </p>
          <p>
            <textarea
              name = "desc"
              placeholder = "Description"
            ></textarea>
          </p>
          <p>
            <input
              type = "submit"
              name = "submit"
              value = "submit"
            ></input>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;