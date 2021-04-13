import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import Menu from './components/Menu';
import Contents from './components/Contents';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject title="WEB" text="World Wide Web!"></Subject>
        <Subject title="React" text="For UI"></Subject>
        <Menu></Menu>
        <Contents title="HTML" desc="HTML is HyperText Markup Language."></Contents>
      </div>
    )
  }
}

export default App;
