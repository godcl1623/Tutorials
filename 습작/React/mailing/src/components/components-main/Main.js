import React, { Component } from 'react';
import Navigation from '../Navigation';
import MainForm from './Main-form';
import MainStart from './Main-start';
import '../styles/Main.css';

class Main extends Component {
  render() {
    return(
      <div className="main">
        <Navigation />
        <MainForm />
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
