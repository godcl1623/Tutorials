import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { manaCurrentPage } from '../../actions';
import Navigation from '../Navigation';
import ManageMain from './Mana-start';
import Statistics from './Mana-stats';
import WriteNews from './Mana-write';
import NewsList from './Mana-list';
import DataUpdate from './Mana-update';
import '../styles/Management.css';

const Management = ({ manaState, makeCurrentPage }) => {
  const navigationMenu = [
    {
      className: 'ManageMain',
      textValue: 'Main Page'
    },
    {
      className: 'Statistics',
      textValue: '통계자료'
    },
    {
      className: 'WriteNews',
      textValue: '뉴스 작성'
    },
    {
      className: 'NewsList',
      textValue: '뉴스 리스트'
    },
    {
      className: 'MemberUpdate',
      textValue: '정보 수정'
    }
  ];

  const whatIsThis = event => {
    const target = event.target.className;
    const menus = navigationMenu.map(element => element.className);
    if (!menus.includes(target)) return;
    makeCurrentPage(target);
  };

  const distributor = () => {
    switch (manaState) {
      case 'ManageMain':
        return <Route path="/" exact component={ManageMain} />;
      case 'Statistics':
        return <Route path="/stats" exact component={Statistics} />;
      case 'WriteNews':
        return <Route path="/write" exact component={WriteNews} />;
      case 'NewsList':
        return <Route path="/lists" exact component={NewsList} />;
      case 'MemberUpdate':
        return <Route path="/stats/update/:id" exact component={DataUpdate} />;
      default:
        break;
    }
  };

  return (
    <div className="management" onClick={whatIsThis}>
      <BrowserRouter>
        <Navigation menuData={navigationMenu} />
        <Switch>{distributor()}</Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return { manaState: state.manaState };
};

export default connect(mapStateToProps, {
  makeCurrentPage: manaCurrentPage
})(Management);
