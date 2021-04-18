import React, {Component} from 'react';
import './App.css';
import Subject from './Components/Subject';
import Menu from './Components/Menu';
import ReadContent from './Components/ReadContent';
import Modify from './Components/Modify';
import CreateContent from './Components/CreateContent';
import UpdateContent from './Components/UpdateContent';

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
  getMatchingElement() {
    const gettingData = this.state.menu.find(element => element.id === this.selectedContentId);
    return gettingData;
  }
  renderList() {
    const {title: _title, desc: _desc} = this.getMatchingElement();
    let _content;
    switch (this.state.mode) {
      case 'welcome':
        _content = <ReadContent title={_title} desc={_desc}/>;
        break;
      case 'read':
        _content = <ReadContent title = {_title} desc = {_desc}/>;
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
              menu: newContent,
              mode: 'read'
            })
            this.selectedContentId = this.maxContentNumber;
          }}
        />
        break;
      case 'update':
        _content = <UpdateContent
          data = {this.getMatchingElement()}
          onClickSubmitBtn = {(_id, _title, _desc) => {
            const newContent = Array.from(this.state.menu);
            newContent.forEach((element, i) => {
              if (element.id === _id) {
                newContent[i] = {id: _id, title: _title, desc: _desc}
              }
            });
            this.setState({
              menu: newContent,
              mode: 'read'
            })
            this.selectedContentId = this.maxContentNumber;
          }}
        />
        break;
      default:
        break;
    }
    return _content;
  }
  render() {
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
        />
        <Menu
          data = {this.state.menu}
          onClickElements = {id => {
            this.setState({
              mode: 'read'
            })
            this.selectedContentId = Number(id);
          }}
        />
        <Modify
          onClickButton = {selectedMode => {
            this.setState({
              mode: selectedMode
            })
          }}
        />
        {this.renderList()}
      </div>
    );
  }
}

export default App;