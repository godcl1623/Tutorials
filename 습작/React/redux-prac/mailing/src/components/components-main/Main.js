import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import MainForm from './Main-form';
import MainStart from './Main-start';
import MainAbout from './Main-about';
import '../styles/Main.css';

const Main = () => {
  const [currentPage, setCurrentPage] = useState('MainStart');

  const whatIsThis = event => {
    const target = event.target.className;
    if (target !== 'MainStart' && target !== 'MainAbout' && target !== 'MainForm') return;
    setCurrentPage(target);
  };

  const navigationMenu = [
    {
      className: 'MainStart',
      textValue: 'Main Page'
    },
    {
      className: 'MainAbout',
      textValue: 'About Us'
    },
    {
      className: 'MainForm',
      textValue: 'Sign-up'
    }
  ];

  return (
    <div className="main" onClick={whatIsThis}>
      <BrowserRouter>
        <Navigation menuData={navigationMenu} />
        <Route path="/" exact component={MainStart} />
        <Route path="/form" exact component={MainForm} />
        <Route path="/about" exact component={MainAbout} />
      </BrowserRouter>
    </div>
  );
};

export default Main;
