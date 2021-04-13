import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import Menu from './components/Menu';
import Contents from './components/Contents';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject1: {title:'WEB', text:'World Wide Web!'},
      subject2: {title:'React', text:'For UI'},
      contents: {title:'HTML', desc:'HTML is HyperText Markup Language.'},
      menu: [
        {id: 1, title: 'HTML', desc:'HTML is for information'},
        {id: 2, title: 'CSS', desc:'CSS is for design'},
        {id: 3, title: 'JavaScript', desc:'JavaScript is for interaction'},
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <Subject title={this.state.subject1.title} text={this.state.subject1.text}></Subject>
        <Subject title={this.state.subject2.title} text={this.state.subject2.text}></Subject>
        <Menu data={this.state.menu}></Menu>
        <Contents title={this.state.contents.title} desc={this.state.contents.desc}></Contents>
      </div>
    )
  }
}

export default App;
