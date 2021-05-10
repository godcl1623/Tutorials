import React from 'react';

class Navigation extends React.Component {
  renderList = () => {
    const menuList = this.props.menuData;
    return menuList.map((menu, index) => {
      return (
        <li key={index} className={`list ${index}`}>
          <button className={menu.className}>{menu.textValue}</button>
        </li>
      );
    });
  };

  render() {
    return(
      <div className="navigation">
        <ul className="main-menu">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default Navigation;