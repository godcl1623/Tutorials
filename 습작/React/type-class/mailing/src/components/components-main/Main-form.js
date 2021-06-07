import React, { useEffect } from 'react';
import '../styles/Main-form.css';

const MainForm = () => {
  useEffect(() => {
    const select = document.querySelectorAll('select');
    select.forEach(element => element.value = '');
  }, []);

  const selections = () => {
    const values = [];
    for (let i = 0; i < 8; i++) {
      values.push(`lorem ${i+1}`);
    }
    const interests = values.map((value, i) => {
      return (
        <div key={i} id="selection-container">
          <input
            id={`cb${i+1}`}
            type="checkbox"
            name="interest"
            value={values[i]}
          />
          <p>{value}</p>
        </div>);
    });
    return interests;
  };

  const sendToStorage = data => {
    const formValue = JSON.parse(localStorage.getItem('localFormValue')) || [];
    formValue.push(data);
    localStorage.setItem('localFormValue', JSON.stringify(formValue));
  };

  const handleSubmit = event => {
    // event.preventDefault();
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
    sendToStorage(value);
    event.target.reset();
  }

  return(
    <form
      // action="/submit_process"
      // method="post"
      onSubmit={handleSubmit}
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
      <select
        id="gender-input"
        name="gender"
      >
        <option>남</option>
        <option>여</option>
        <option>비공개</option>
      </select>
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
          <select
            id="email-provider"
            name="email-provider"
          >
            <option>gmail.com</option>
            <option>hotmail.com</option>
            <option>naver.com</option>
            <option>daum.net</option>
          </select>
        </section>
      <label
        className="source-header"
        htmlFor="source-input"
      >
        가입경로
      </label>
      <select
        id="source-input"
        name="source"
      >
        <option>Lorem ipsum dolor sit amet 1.</option>
        <option>Lorem ipsum dolor sit amet 2.</option>
        <option>Lorem ipsum dolor sit amet 3.</option>
      </select>
      <label
        className="interest-header"
        htmlFor="interest-input"
      >
        관심사
      </label>
        <section id="interest-input">
          {selections()}
        </section>
      <label
        className="favorite-header"
        htmlFor="favorite-input"
      >
        희망 배송시간
      </label>
      <select
        id="favorite-input"
        name="favorite-time"
      >
        <option>오전 9시</option>
        <option>오후 12시</option>
        <option>오후 3시</option>
        <option>오후 6시</option>
      </select>
      <input
        id="submit"
        type="submit"
      />
    </form>
  );
}

export default MainForm;