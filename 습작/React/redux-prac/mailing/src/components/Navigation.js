import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ menuData }) => {
  const renderList = () => {
    return menuData.map((menu, index) => {
      if (menu.className === 'MemberUpdate') return;
      const dest = target => {
        switch (target.className) {
          case 'MainAbout':
            return 'about';
          case 'MainForm':
            return 'form';
          case 'MainStart':
            return '';
          case 'ManageMain':
            return '';
          case 'Statistics':
            return 'stats';
          case 'WriteNews':
            return 'write';
          case 'NewsList':
            return 'lists';
          default:
            return '';
        }
      };

      return (
        <li key={index} className={`list ${index}`}>
          <Link className={menu.className} to={`/${dest(menu)}`}>
            {menu.textValue}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="navigation">
      <ul className="main-menu">{renderList()}</ul>
    </div>
  );
};

export default Navigation;
