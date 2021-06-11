import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const WriteNews = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful }
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitSuccess = data => {
    fetch('http://localhost:3001/news/add', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => console.log('Data Post Success !'))
      .catch(err => console.error(err));
  };

  const onError = error => {
    console.error(error);
  };

  return (
    <div className="management-write">
      <h1>뉴스작성</h1>
      <form onSubmit={handleSubmit(onSubmitSuccess, onError)}>
        <input type="text" {...register('headline')} placeholder="제목" />
        <textarea {...register('contents')} placeholder="내용" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default WriteNews;
