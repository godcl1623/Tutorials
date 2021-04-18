import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import Menu from './components/Menu';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
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
  getReadContent() {
    const test = this.state.menu.find(element => element.id === this.state.selectedContentId);
    return test;
  }
  decideArticle() {
    let _title, _desc, _article;
    switch(this.state.mode) {
      case 'welcome':
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        break;
      case 'read':
        const _content = this.getReadContent();
        _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
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
                menu: _content,
                mode: 'read',
                selectedContentId: this.maxContentId
              })
            }}
          ></CreateContent>;
        break;
        case 'update':
          const _info = this.getReadContent();
          _article =
            <UpdateContent
              data = {_info}
              onSubmitAction={(_id, _title, _desc) => {
                const _content = Array.from(this.state.menu);
                let i = 0;
                while (i < this.state.menu.length) {
                  if (_content[i].id === _id) {
                    _content[i] = {id: _id, title: _title, desc: _desc};
                    break;
                  }
                  i++;
                }
                this.setState({
                  menu: _content,
                  mode: 'read'
                });
              }}
            ></UpdateContent>;
          break;
      default:
        break;
    }
    return _article;
  }
  render() {
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
        {this.decideArticle()}
      </div>
    )
  }
}

export default App;
