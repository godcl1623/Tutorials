import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post1: {title: '일산 고기 맛집', date: '2월 13일 발행'},
      post2: {title: '남자 코트 추천', date: '3월 27일 발행'},
      post3: {title: '더 만달로리안 시즌3 리뷰', date: '4월 30일 발행'}
    }
  }
  render() {
    return(
      <div id="root">
        <nav className="black-nav">
          <span>개발 Blog</span>
        </nav>
        <article className="post-box">
          <h3>{ this.state.post1.title }</h3>
          <span>{ this.state.post1.date }</span>
        </article>
        <article className="post-box">
          <h3>{ this.state.post2.title }</h3>
          <span>{ this.state.post2.date }</span>
        </article>
        <article className="post-box">
          <h3>{ this.state.post3.title }</h3>
          <span>{ this.state.post3.date }</span>
        </article>
      </div>
    );
  }
}

export default App;
