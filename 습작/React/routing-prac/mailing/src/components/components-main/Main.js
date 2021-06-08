import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import MainForm from './Main-form';
import MainStart from './Main-start';
import MainAbout from './Main-about';
import '../styles/Main.css';

const Main = () => {
  const [selectedClass, setSelectedClass] = useState('MainStart');
  // const scopeRef = useRef();

  const whatIsThis = event => {
    const classValue = event.target.classList.value;
    if (
      classValue === 'main' ||
      classValue === '' ||
      classValue === 'navigation' ||
      classValue === 'main-menu'
    )
      return;
    setSelectedClass(event.target.classList.value);
    console.log(event.target.classList.value);
  };

  const changeComponent = () => {
    switch (selectedClass) {
      case 'MainStart':
        return <Route path="/main" component={MainStart} />;
      // return <MainStart />;
      case 'MainForm':
        return <Route path="/form" component={MainForm} />;
      // return <MainForm />;
      case 'MainAbout':
        return <Route path="/about" component={MainAbout} />;
      // return <MainStart />;
      default:
        return <h1 className="loading">Loading...</h1>;
    }
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
      <Navigation menuData={navigationMenu} />
      <BrowserRouter>{changeComponent()}</BrowserRouter>
    </div>
  );
};

export default Main;
