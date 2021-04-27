import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  render() {
    return(
      <div className="main-form">
        <form>
          <section className="area name">
            <p>
              이름
              <input type="text" />
            </p>
            <p>
              성
              <input type="text" />
            </p>
            <p>
              성별
              <input type="text" />
            </p>
          </section>
          <section className="area email">
            <p>이메일</p>
            <input type="text" />
            <p>@</p>
            <input type="text" />
          </section>
          <section className="area statistics">
            <p>가입경로</p>
            <textarea />
            <p>관심사</p>
            <section className="area multi-choice">
              <input type="radio" />
              <p>lorem ipsum</p>
            </section>
            <p>희망 배송시간</p>
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
