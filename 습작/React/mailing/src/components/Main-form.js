import React from 'react';
import './Main-form.css';

const MainForm = props => {
  return(
    <form
      action="/submit_process"
      method="post"
      onSubmit={props.onSubmitForm}
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
          {props.interestList}
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
  );
}

export default MainForm;