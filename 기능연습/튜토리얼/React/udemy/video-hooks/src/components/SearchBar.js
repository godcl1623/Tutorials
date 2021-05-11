import React from 'react';

class SearchBar extends React.Component {
  state = { text: '' }

  changeText = event => {
    this.setState({
      text: event.target.value
    })
  }

  submitQuery = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.text);
  }

  render(){
    return (
      <div className="search-bar ui segment">
        <form
          className="ui form"
          onSubmit={this.submitQuery}
        >
          <div className="field">
            <label>Video Search</label>
            <input
              type="text"
              value={this.state.text}
              onChange={this.changeText}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;