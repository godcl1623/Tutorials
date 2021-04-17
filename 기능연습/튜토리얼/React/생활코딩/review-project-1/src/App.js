import React, {Component} from 'react';
import './App.css';
import Subject from './Components/Subject';
import Menu from './Components/Menu';
import ReadContent from './Components/ReadContent';
import Modify from './Components/Modify';
import CreateContent from './Components/CreateContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.selectedContentId = 1;
    this.state = {
      mode: 'read',
      welcome: {title: 'Welcome', desc: 'This is main page'},
      subject: {title: 'Welcome', desc: 'This is React Tutorial Review !!'},
      menu: [
        {id: 1, title: 'HTML', desc: 'HTML is for making web pages !'},
        {id: 2, title: 'CSS', desc: 'CSS is for styling web pages !'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interaction'}
      ],
    }
    this.maxContentNumber = this.state.menu.length;
  }
  render() {
    let _title, _desc, _content;
    switch (this.state.mode) {
      case 'welcome':
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _content = <ReadContent title={_title} desc={_desc}></ReadContent>;
        break;
      case 'read':
        this.state.menu.forEach((element, i) => {
          if (element.id === this.selectedContentId) {
            _title = this.state.menu[i].title;
            _desc = this.state.menu[i].desc;
            _content = <ReadContent title={_title} desc={_desc}></ReadContent>;
          }
        });
        break;
      case 'create':
        _content = <CreateContent
          onClickSubmitBtn = {(_title, _desc) => {
            this.maxContentNumber++;
            const newContent = this.state.menu.concat({
              id: this.maxContentNumber,
              title: _title,
              desc: _desc
            });
            this.setState({
              menu: newContent
            })
          }}
        ></CreateContent>;
        break;
      default:
        break;
    }
    return(
      <div id="root">
        <Subject
          title = {this.state.subject.title}
          desc = {this.state.subject.desc}
          onClickElement = {() => {
            this.setState({
              mode: 'welcome'
            })
          }}
        ></Subject>
        <Menu
          data = {this.state.menu}
          onClickElements = {id => {
            this.setState({
              mode: 'read'
            })
            this.selectedContentId = Number(id);
          }}
        ></Menu>
        <Modify
          onClickButton = {selectedMode => {
            this.setState({
              mode: selectedMode
            })
          }}
        ></Modify>
        {_content}
      </div>
    );
  }
}

export default App;