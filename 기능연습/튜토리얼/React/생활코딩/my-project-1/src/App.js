import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render(){
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.text}
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
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

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
