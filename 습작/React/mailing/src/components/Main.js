import React, { Component } from 'react';
import '../App.css';

class Main extends Component {
  render() {
    return(
      <div className="main-form">
        <form>
          <section className="area name">
            <span>이름</span>
            <input type="text" />
            <span>성</span>
            <input type="text" />
            <span>성별</span>
            <input type="text" />
          </section>
          <section className="area email">
            <span>이메일</span>
            <input type="text" />
            <span>@</span>
            <input type="text" />
          </section>
          <section className="area statistics">
            <span>가입경로</span>
            <textarea />
            <span>관심사</span>
            <section className="area multi-choice">
              <input type="radio" />
              <span>lorem ipsum</span>
            </section>
            <span>희망 배송시간</span>
            <textarea />
          </section>
          <input type="submit" />
        </form>
        <button>관리</button>
      </div>
    );
  }
}

export default Main;
