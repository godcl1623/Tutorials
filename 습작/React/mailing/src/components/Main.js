import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  selections = function() {
    const container = [];
    for (let i = 0; i < 8; i++) {
      container.push(
        <div key={i} className="selection-container">
          <input id={`cb${i+1}`} type="checkbox" />
          <p>lorem ipsum {i+1}</p>
        </div>
      )
    }
    return container;
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = data.entries();
    console.log({value});
  }

  render() {
    return(
      <div className="main-form">
        <form
          action="/submit_process"
          method="post"
          onSubmit={(event) => {this.handleSubmit(event)}}
        >
          <span className="name-header">이름</span>
          <input className="name-input" type="text" name="name" />
          <span className="family-header">성</span>
          <input className="family-input" type="text" name="family" />
          <span className="gender-header">성별</span>
          <input className="gender-input" type="text" />
          <span className="email-header">이메일</span>
          <section className="email-input">
            <input type="text" />
            <span>@</span>
            <input type="text" />
          </section>
            <span className="source-header">가입경로</span>
            <textarea className="source-input" />
              <span className="interest-header">관심사</span>
              <section className="interest-input">
                {this.selections()}
              </section>
            <span className="favorite-header">희망 배송시간</span>
            <textarea className="favorite-input" />
          <input
            className="submit"
            type="submit"
            // onClick={event => {
            //   event.preventDefault();
            // }}
          />
        </form>
        {/* <button>관리</button> */}
      </div>
    );
  }
}

export default Main;
