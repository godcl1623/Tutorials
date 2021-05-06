import React, { Component } from 'react';
import MainForm from './Main-form';
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
      <div className="main">
        <MainForm
          interestList={this.selections()}
          onSubmitForm={this.handleSubmit}
        />
        <button
          id="management"
          onClick={() => {alert('관리 기능 구현 중!')}}
        >
          관리
        </button>
      </div>
    );
  }
}

export default Main;
