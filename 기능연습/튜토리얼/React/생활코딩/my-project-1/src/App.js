import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render(){
    return (
      <header>
        <h1>WEB</h1>
        world wide web!
      </header>
    );
  }
}

class Menu extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a href="1.html">HTML</a></li>
          <li><a href="1.html">CSS</a></li>
          <li><a href="1.html">JavaScript</a></li>
        </ul>
      </nav>
    )
  }
}

class Contents extends Component {
  render () {
    return (
      <article>
        <h2>HTML</h2>
        HTML is HyperText Markup Language.
      </article>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject></Subject>
        <Menu></Menu>
        <Contents></Contents>
      </div>
    )
  }
}

export default App;
