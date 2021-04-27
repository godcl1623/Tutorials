import React, { Component } from 'react';
import Main from './components/Main';
import Management from './components/Management';
import './App.css';

class App extends Component {
  render() {
    return(
      <div className="App_Root">
        <Main />
        <Management />
      </div>
    );
  }
}

export default App;
