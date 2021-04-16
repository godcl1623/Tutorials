import React, { Component } from 'react';
import './App.css';
import Subject from './Components/Subject';
import Menu from './Components/Menu';
import Content from './Components/Content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      selectedContentId: 2,
      welcome: {title: 'Welcome', desc: 'Hello React !'},
      subject: {title: 'Welcome', desc: 'This is React Tutorial Review !'},
      menu: [
        {id: 1, title: 'HTML', desc: 'HTML is for making web pages'},
        {id: 2, title: 'CSS', desc: 'CSS is for design'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interaction'},
      ],
      content: {title: 'HTML', desc: 'HTML is for making web pages !'}
    }
  }

  render() {
    let _title, _desc;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      this.state.menu.forEach((element, i) => {
        if (element.id === this.state.selectedContentId) {
          _title = this.state.menu[i].title;
          _desc = this.state.menu[i].desc;          
        }
      })
    }
    return(
      <div id="root">
        <Subject
          title={this.state.subject.title}
          desc={this.state.subject.desc}
          onClickElement={() => {
            this.setState({
              mode: 'welcome'
            });
          }}
        ></Subject>
        <Menu
          data={this.state.menu}
          onClickElement={id => {
            this.setState({
              mode: 'read',
              selectedContentId: Number(id)
            });
          }}
        ></Menu>
        <Content
          title={_title}
          desc={_desc}
        ></Content>
      </div>
    );
  }
}

export default App;