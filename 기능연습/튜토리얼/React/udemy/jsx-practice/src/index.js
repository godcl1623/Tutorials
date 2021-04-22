import React from 'react';
import ReactDOM from 'react-dom';

const returnText = () => {
  return 'Click';
}

const App = () => {
  const textLocation = 'Submit';
  return (
    <div>
      <label className="label" for="name">
        Enter name:
      </label>
      <input id="name" type="text" />
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white'
        }}
      >
        {/* {textLocation} */}
        {returnText()}
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));