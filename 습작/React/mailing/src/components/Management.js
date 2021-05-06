import React, { Component } from 'react';
import './styles/Management.css';

class Management extends Component {
  render() {
    return(
      <div className="management">
        <nav className="navigator">
          <button>Main</button>
          <button>통계</button>
          <button>뉴스작성</button>
          <button>뉴스목록</button>
        </nav>
        <section className="render-area">
          <h2>This is Render-area</h2>
        </section>
      </div>
    );
  }
}

export default Management;
