import React, {Component} from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    }
  }
  updateValue = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return(
      <article>
        <h1>
          Update
        </h1>
        <form
          action = "/submit_process"
          method = "post"
          onSubmit = {event => {
            event.preventDefault();
            this.props.onClickSubmitBtn(this.state.id, this.state.title, this.state.desc);
          }}
        >
          <input
            type="hidden"
            name="id"
            value={this.state.id}
          ></input>
          <p>
            <input
              type = "text"
              name = "title"
              placeholder = "Title"
              value = {this.state.title}
              onChange = {event => {
                this.setState(this.updateValue(event))
              }}
            ></input>
          </p>
          <p>
            <textarea
              name = "desc"
              placeholder = "Description"
              value = {this.state.desc}
              onChange = {event => {
                this.setState(this.updateValue(event))
              }}
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

export default UpdateContent;