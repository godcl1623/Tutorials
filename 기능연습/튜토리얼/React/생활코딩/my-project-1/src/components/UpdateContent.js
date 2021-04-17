import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.title,
      desc: this.props.data.desc
    }
  }
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.title !== this.props.title) {
  //     return true;
  //   }
  //   return false;
  // }
  changeValue(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render () {
    console.log(this.props.data);
    return (
      <article>
        <h2>Update</h2>
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
              value={this.state.title}
              onChange={this.changeValue.bind(this)}
            ></input>
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="Description"
              value={this.state.desc}
              onChange={this.changeValue.bind(this)}
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

export default UpdateContent;
