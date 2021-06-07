import React from 'react';

const Navigation = ({ menuData }) => {
  const renderList = () => {
    return menuData.map((menu, index) => {
      return (
        <li key={index} className={`list ${index}`}>
          <button className={menu.className}>{menu.textValue}</button>
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
