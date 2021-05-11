import React, { useState } from 'react';

const SearchBar = (props) => {
  const [text, setText] = useState('');

  const changeText = event => {
    setText(event.target.value);
  }

  const submitQuery = event => {
    event.preventDefault();
    props.onFormSubmit(text);
  }

  return (
    <div className="search-bar ui segment">
      <form
        className="ui form"
        onSubmit={submitQuery}
      >
        <div className="field">
          <label>Video Search</label>
          <input
            type="text"
            value={text}
            onChange={changeText}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;