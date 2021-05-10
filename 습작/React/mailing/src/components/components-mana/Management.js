import React, { Component } from 'react';
import Navigation from '../Navigation';
import '../styles/Management.css';

class Management extends Component {
  navigationMenu = [
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

  render() {
    return(
      <div className="management">
        <Navigation
          menuData={this.navigationMenu}
        />
        <section className="render-area">
          <h2>This is Render-area</h2>
        </section>
      </div>
    );
  }
}

export default Management;
