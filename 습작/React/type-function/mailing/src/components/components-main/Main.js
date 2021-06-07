import React, { useState } from 'react';
import Navigation from '../Navigation';
import MainForm from './Main-form';
import MainStart from './Main-start';
import MainAbout from './Main-about';
import '../styles/Main.css';

const Main = () => {
  const [selectedClass, setSelectedClass] = useState('MainForm');
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
  };

  const changeComponent = () => {
    switch (selectedClass) {
      case 'MainStart':
        return <MainStart />;
      case 'MainForm':
        return <MainForm />;
      case 'MainAbout':
        return <MainAbout />;
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
      {changeComponent()}
    </div>
  );
};

export default Main;
