import React, { Component } from 'react';
import Navigation from '../Navigation';
import MainForm from './Main-form';
import MainStart from './Main-start';
import MainAbout from './Main-about';
import '../styles/Main.css';

class Main extends Component {
  state={selectedClass: 'MainForm'}

  whatIsThis = (e) => {
    this.setState({
      selectedClass: e.target.classList.value
    })
  }

  changeComponent = () => {
    switch (this.state.selectedClass) {
      case 'MainStart':
        return <MainStart />
      case 'MainForm':
        return <MainForm />
      case 'MainAbout':
        return <MainAbout />
      default:
        return <h1 className="loading">Loading...</h1>
    }
  }

  render() {
    return(
      <div className="main" onClick={this.whatIsThis}>
        <Navigation />
        {this.changeComponent()}
        <button
          id="management"
          onClick={() => {alert('관리 기능 구현 중!')}}
        >
          관리
        </button>
      </div>
    );
  }
}

export default Main;
