import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import ManageMain from './Mana-start';
import Statistics from './Mana-stats';
import WriteNews from './Mana-write';
import NewsList from './Mana-list';
import '../styles/Management.css';

const Management = () => {
  const [currentPage, setCurrentPage] = useState('ManageMain');

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

  const whatIsThis = event => {
    const target = event.target.className;
    const menus = navigationMenu.map(element => element.className);
    if (!menus.includes(target)) return;
    setCurrentPage(target);
    console.log(currentPage);
  };

  const distributor = () => {
    switch (currentPage) {
      case 'ManageMain':
        return <Route path="/" exact component={ManageMain} />;
      case 'Statistics':
        return <Route path="/stats" exact component={Statistics} />;
      case 'WriteNews':
        return <Route path="/write" exact component={WriteNews} />;
      case 'NewsList':
        return <Route path="/lists" exact component={NewsList} />;
      default:
        break;
    }
  };

  return (
    <div className="management" onClick={whatIsThis}>
      <BrowserRouter>
        <Navigation menuData={navigationMenu} />
        {distributor()}
      </BrowserRouter>
    </div>
  );
};

export default Management;
