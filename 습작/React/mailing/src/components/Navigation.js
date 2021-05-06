import React from 'react';

class Navigation extends React.Component {
  render() {
    return(
      <div className="navigation">
        <ul className="main-menu">
          <li className="start-page">
            <button>Main Page</button>
          </li>
          <li className="introduction">
            <button>About Us</button>
          </li>
          <li className="sign-up">
            <button>Sign-up</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;