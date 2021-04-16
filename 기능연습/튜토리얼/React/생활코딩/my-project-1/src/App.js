import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import Menu from './components/Menu';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Control from './components/Control';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      welcome: {title: 'Welcome', desc: 'Hello, React !!'},
      selectedContentId: 3,
      subject1: {title:'WEB', text:'World Wide Web!'},
      subject2: {title:'React', text:'For UI'},
      contents: {title:'HTML', desc:'HTML is HyperText Markup Language.'},
      menu: [
        {id: 1, title: 'HTML', desc:'HTML is for information'},
        {id: 2, title: 'CSS', desc:'CSS is for design'},
        {id: 3, title: 'JavaScript', desc:'JavaScript is for interaction'},
      ]
    }
    this.maxContentId = this.state.menu[this.state.menu.length - 1].id;
  }
  render() {
    let _title, _desc, _article;
    switch(this.state.mode) {
      case 'welcome':
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        break;
      case 'read':
        this.state.menu.forEach((element, i) => {
          if (element.id === this.state.selectedContentId) {
            _title = this.state.menu[i].title;
            _desc = this.state.menu[i].desc;
          }
        });
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        break;
      case 'create':
        _article =
          <CreateContent
            onSubmitAction={(_title, _desc) => {
              this.maxContentId++;
              const _content = this.state.menu.concat(
                {id: this.maxContentId, title: _title, desc: _desc}
              )
              this.setState({
                menu: _content
              })
            }}
          ></CreateContent>;
        break;
      default:
        break;
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject1.title}
          text={this.state.subject1.text}
          onClickElement={function() {
            this.setState(
              {mode: 'welcome'}
            );
          }.bind(this)}
        ></Subject>
        {/* <Subject title={this.state.subject2.title} text={this.state.subject2.text}></Subject> */}
        <Menu
          data={this.state.menu}
          onClickElement={function(id) {
            this.setState({
              mode: 'read',
              selectedContentId: Number(id)
            });
          }.bind(this)}
        ></Menu>
        <Control
          onClickElement={_mode => {
            this.setState({
              mode: _mode
            })
          }}
        ></Control>
        {_article}
      </div>
    )
  }
}

export default App;
