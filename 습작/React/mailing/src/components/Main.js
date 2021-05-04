import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  selections = function() {
    // const container = [];
    const values = [];
    for (let i = 0; i < 8; i++) {
      // container.push(
      //   <div key={i} className="selection-container">
      //     <input id={`cb${i+1}`} type="checkbox" name="interest" />
      //     <p>lorem ipsum {i+1}</p>
      //   </div>
      // )
      values.push(`lorem ${i+1}`);
    }
    const interests = values.map((value, i) => {
      const interestForm = (
        <div key={i} className="selection-container">
          <input
            id={`cb${i+1}`}
            type="checkbox"
            name="interest"
            value={values[i]}
          />
          <p>lorem ipsum {i+1}</p>
        </div>);
      return interestForm;
    });
    return interests;
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = {
      name: data.get('name'),
      family: data.get('family'),
      gender: data.get('gender'),
      email: `${data.get('email-id')}@${data.get('email-provider')}`,
      source: data.get('source'),
      interests: data.getAll('interest'),
      favorite: data.get('favorite-time')
    }
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
          <label className="name-header" htmlFor="name">이름</label>
          <input className="name-input" type="text" name="name" defaultValue="bar" />
          <label className="family-header" htmlFor="family">성</label>
          <input className="family-input" type="text" name="family" defaultValue="foo" />
          <label className="gender-header" htmlFor="gender">성별</label>
          <input className="gender-input" type="text" name="gender" defaultValue="apache" />
          <label className="email-header" htmlFor="email-input">이메일</label>
          <section className="email-input">
            <input type="text" name="email-id" defaultValue="email" />
            <span>@</span>
            <input type="text" name="email-provider" defaultValue="provider.com" />
          </section>
            <label className="source-header" htmlFor="source">가입경로</label>
            <textarea className="source-input" name="source" defaultValue="비밀" />
              <label className="interest-header" htmlFor="">관심사</label>
              <section className="interest-input">
                {this.selections()}
              </section>
            <label className="favorite-header" htmlFor="">희망 배송시간</label>
            <textarea className="favorite-input" name="favorite-time" defaultValue="오전 14시" />
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
