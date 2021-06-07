import React, { useState } from 'react';
import Navigation from '../Navigation';
import ManageMain from './Mana-start';
import Statistics from './Mana-stats';
import WriteNews from './Mana-write';
import NewsList from './Mana-list';
import '../styles/Management.css';

const Management = () => {
  const [selectedClass, setSelectedClass] = useState('ManageMain');

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
      case 'ManageMain':
        return <ManageMain />;
      case 'Statistics':
        return <Statistics />;
      case 'WriteNews':
        return <WriteNews />;
      case 'NewsList':
        return <NewsList />;
      default:
        return <h1 className="loading">Loading...</h1>;
    }
  };

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
    <div className="management" onClick={whatIsThis}>
      <Navigation menuData={navigationMenu} />
      {changeComponent()}
    </div>
  );
};

export default Management;
