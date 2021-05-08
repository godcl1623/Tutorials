import React from 'react';

class Navigation extends React.Component {
  render() {
    return(
      <div className="navigation">
        <ul className="main-menu">
          <li className="start-page">
            <button className="MainStart">Main Page</button>
          </li>
          <li className="introduction">
            <button className="MainAbout">About Us</button>
          </li>
          <li className="sign-up">
            <button className="MainForm">Sign-up</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;