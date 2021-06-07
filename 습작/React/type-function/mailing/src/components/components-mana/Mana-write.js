import React from 'react';

const WriteNews = () => {
  const sendToStorage = data => {
    const formValue = JSON.parse(localStorage.getItem('NewsList')) || [];
    formValue.push(data);
    localStorage.setItem('NewsList', JSON.stringify(formValue));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = {
      headline: data.get('headline'),
      newsInput: data.get('news-input')
    };
    sendToStorage(value);
    event.target.reset();
  };

  return (
    <div className="management-write">
      <h1>뉴스작성</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="headline" placeholder="제목" />
        <textarea name="news-input" placeholder="내용" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default WriteNews;
