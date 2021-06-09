import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import ManageMain from './Mana-start';
import Statistics from './Mana-stats';
import WriteNews from './Mana-write';
import NewsList from './Mana-list';
import '../styles/Management.css';

const Management = () => {
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
    }
  ];

  return (
    <div className="management">
      <BrowserRouter>
        <Navigation menuData={navigationMenu} />
        <Route path="/" exact component={ManageMain} />
        <Route path="/stats" exact component={Statistics} />
        <Route path="/write" exact component={WriteNews} />
        <Route path="/lists" exact component={NewsList} />
      </BrowserRouter>
    </div>
  );
};

export default Management;
