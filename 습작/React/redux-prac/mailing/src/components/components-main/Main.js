import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { mainCurrentPage } from '../../actions';
import Navigation from '../Navigation';
import MainForm from './Main-form';
import MainStart from './Main-start';
import MainAbout from './Main-about';
import '../styles/Main.css';

const Main = ({ pageState, makeCurrentPage }) => {
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

  const whatIsThis = event => {
    const target = event.target.className;
    const menus = navigationMenu.map(element => element.className);
    if (!menus.includes(target)) return;
    makeCurrentPage(target);
  };

  const distributor = () => {
    switch (pageState) {
      case 'MainStart':
        return <Route path="/" exact component={MainStart} />;
      case 'MainAbout':
        return <Route path="/about" exact component={MainAbout} />;
      case 'MainForm':
        return <Route path="/form" exact component={MainForm} />;
      default:
        break;
    }
  };

  return (
    <div className="main" onClick={whatIsThis}>
      <BrowserRouter>
        <Navigation menuData={navigationMenu} />
        {distributor()}
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return { pageState: state.mainState };
};

export default connect(mapStateToProps, {
  makeCurrentPage: mainCurrentPage
})(Main);
