import React, { Component } from 'react';
import './App.css';
import Subject from './Components/Subject';
import Menu from './Components/Menu';
import ReadContent from './Components/ReadContent';
import Control from './Components/Control';
import CreateContent from './Components/CreateContent';
import UpdateContent from './Components/UpdateContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      selectedContentId: 1,
      welcome: {title: 'Main Page', desc: 'This is Main Page !!'},
      subject: {title: 'Web Page', desc: 'This is React Tutorial Review Page !!'},
      menu: [
        {id: 1, title: 'HTML', desc: 'HTML is for making web pages !!'},
        {id: 2, title: 'CSS', desc: 'CSS is for styling web pages !!'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interaction !!'}
      ],
    }
    this.maxContentId = this.state.menu.length;
  }
  getContentInfo() {
    const selectedOne = this.state.menu.find(element => element.id === this.state.selectedContentId);
    return selectedOne;
  }
  renderContent() {
    const {title: _title, desc: _desc} = this.getContentInfo();
    let _article;
    switch (this.state.mode) {
      case 'welcome':
        const welcomeTitle = this.state.welcome.title;
        const welcomeDesc = this.state.welcome.desc;
        _article = <ReadContent title={welcomeTitle} desc={welcomeDesc}/>;
        break;
      case 'read':
        _article = <ReadContent title={_title} desc={_desc}/>;
        break;
      case 'create':
        _article = <CreateContent
          onSubmitContent={(_title, _desc) => {
            this.maxContentId++;
            const addedContent = this.state.menu.concat(
              {
                id: this.maxContentId,
                title: _title,
                desc: _desc
              }
            );
            this.setState({
              menu: addedContent,
              mode: 'read',
              selectedContentId: this.maxContentId
            })
          }}
        />
        break;
      case 'update':
        _article = <UpdateContent
          data={this.getContentInfo()}
          onSubmitContent={(_id, _title, _desc) => {
            const updatedContent = Array.from(this.state.menu);
            updatedContent.forEach((element, i) => {
              if (element.id === _id) {
                updatedContent[i] = {id: _id, title: _title, desc: _desc};
              }
            })
            this.setState({
              menu: updatedContent,
              mode: 'read',
            })
          }}
        />
        break;
      default:
        break;
    }
    return _article;
  }
  render() {
    return(
      <div id="root">
        <Subject
          title={this.state.subject.title}
          desc={this.state.subject.desc}
          onClickElement={() => {
            this.setState({
              mode: 'welcome'
            })
          }}
        />
        <Menu
          data={this.state.menu}
          onClickElement={id => {
            this.setState({
              mode: 'read',
              selectedContentId: Number(id)
            })
          }}
        />
        <Control
          onClickBtn={type => {
            if(type === 'delete') {
              if(window.confirm('삭제 하시겠습니까?')) {
                const afterDelete = Array.from(this.state.menu);
                afterDelete.forEach((element, i) => {
                  if (element.id === this.state.selectedContentId) {
                    afterDelete.splice(i, 1);
                  }
                });
                this.setState({
                  selectedContentId: 1,
                  menu: afterDelete,
                  mode: 'welcome'
                });
                alert('삭제 되었습니다 !');
              }
              return;
            }
            this.setState({
              mode: type
            })
          }}
        />
        {this.renderContent()}
      </div>
    );
  }
}

export default App;