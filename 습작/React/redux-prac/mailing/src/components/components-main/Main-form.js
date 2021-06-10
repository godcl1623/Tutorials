import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/Main-form.css';

const MainForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful }
  } = useForm();

  useEffect(() => {
    const select = document.querySelectorAll('select');
    select.forEach(element => {
      element.value = '';
    });
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const sendToStorage = data => {
    const formValue = JSON.parse(localStorage.getItem('localFormValue')) || [];
    formValue.push(data);
    localStorage.setItem('localFormValue', JSON.stringify(formValue));
  };

  const onSubmitSuccess = data => {
    const tempData = { ...data };
    const email = `${tempData['email-id']}@${tempData['email-provider']}`;
    delete tempData['email-id'];
    delete tempData['email-provider'];
    const newData = { ...tempData, email };
    sendToStorage(newData);
  };

  const onError = error => {
    // error.ref.style.border = '1px solid red';
    console.log(error);
  };
  // console.log(watch());

  const selections = () => {
    const values = [];
    for (let i = 0; i < 8; i++) {
      values.push(`lorem ${i + 1}`);
    }
    const interests = values.map((value, i) => {
      return (
        <div key={i} id="selection-container">
          <input id={`cb${i + 1}`} type="checkbox" {...register('interest')} value={values[i]} />
          <p>{value}</p>
        </div>
      );
    });
    return interests;
  };

  return (
    <form
      // action="/submit_process"
      // method="post"
      onSubmit={handleSubmit(onSubmitSuccess, onError)}
    >
      <label className="name-header" htmlFor="name-input">
        이름
      </label>
      <input
        id="name-input"
        type="text"
        {...register('name', { required: '이름을 입력해 주세요' })}
      />
      <label className="family-header" htmlFor="family-input">
        성
      </label>
      <input id="family-input" type="text" {...register('family')} />
      <label className="gender-header" htmlFor="gender-input">
        성별
      </label>
      <select id="gender-input" {...register('gender')}>
        <option>남</option>
        <option>여</option>
        <option>비공개</option>
      </select>
      <label className="email-header" htmlFor="email-input">
        이메일
      </label>
      <section id="email-input">
        <input type="text" {...register('email-id')} />
        <span>@</span>
        <select id="email-provider" {...register('email-provider')}>
          <option>gmail.com</option>
          <option>hotmail.com</option>
          <option>naver.com</option>
          <option>daum.net</option>
        </select>
      </section>
      <label className="source-header" htmlFor="source-input">
        가입경로
      </label>
      <select id="source-input" {...register('source')}>
        <option>Lorem ipsum dolor sit amet 1.</option>
        <option>Lorem ipsum dolor sit amet 2.</option>
        <option>Lorem ipsum dolor sit amet 3.</option>
      </select>
      <label className="interest-header" htmlFor="interest-input">
        관심사
      </label>
      <section id="interest-input">{selections()}</section>
      <label className="favorite-header" htmlFor="favorite-input">
        희망 배송시간
      </label>
      <select id="favorite-input" {...register('favorite-time')}>
        <option>오전 9시</option>
        <option>오후 12시</option>
        <option>오후 3시</option>
        <option>오후 6시</option>
      </select>
      <input id="submit" type="submit" />
    </form>
  );
};

export default MainForm;
