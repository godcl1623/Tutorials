import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  selections = function() {
    // const container = [];
    const values = [];
    for (let i = 0; i < 8; i++) {
      values.push(`lorem ${i+1}`);
    }
    const interests = values.map((value, i) => {
      const interestForm = (
        <div key={i} id="selection-container">
          <input
            id={`cb${i+1}`}
            type="checkbox"
            name="interest"
            value={values[i]}
          />
          <p>{value}</p>
        </div>);
      return interestForm;
    });
    return interests;
  };

  sendToStorage = data => {
    const formValue = JSON.parse(localStorage.getItem('localFormValue')) || [];
    formValue.push(data);
    localStorage.setItem('localFormValue', JSON.stringify(formValue));
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
    this.sendToStorage(value);
    event.target.reset();
  }

  render() {
    return(
      <div className="main-form">
        <form
          action="/submit_process"
          method="post"
          onSubmit={(event) => {this.handleSubmit(event)}}
        >
          <label
            className="name-header"
            htmlFor="name-input"
          >
            이름
          </label>
            <input
              id="name-input"
              type="text"
              name="name"
            />
          <label
            className="family-header"
            htmlFor="family-input"
          >
            성
          </label>
            <input
              id="family-input"
              type="text"
              name="family"
            />
          <label
            className="gender-header"
            htmlFor="gender-input"
          >
            성별
          </label>
            <input
              id="gender-input"
              type="text"
              name="gender"
            />
          <label
            className="email-header"
            htmlFor="email-input"
          >
            이메일
          </label>
            <section id="email-input">
              <input
                type="text"
                name="email-id"
              />
              <span>@</span>
              <input
                type="text"
                name="email-provider"
              />
            </section>
          <label
            className="source-header"
            htmlFor="source-input"
          >
            가입경로
          </label>
            <textarea
              id="source-input"
              name="source"
            />
          <label
            className="interest-header"
            htmlFor="interest-input"
          >
            관심사
          </label>
            <section id="interest-input">
              {this.selections()}
            </section>
          <label
            className="favorite-header"
            htmlFor="favorite-input"
          >
            희망 배송시간
          </label>
            <textarea
              id="favorite-input"
              name="favorite-time"
            />
          <input
            id="submit"
            type="submit"
          />
        </form>
        <button id="management">관리</button>
      </div>
    );
  }
}

export default Main;
