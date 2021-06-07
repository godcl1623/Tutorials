import React, { useState } from 'react';

const NewsList = () => {
  const newsList = JSON.parse(localStorage.getItem('NewsList'));
  const [headline, setHeadline] = useState('');
  const [newsInput, setNewsInput] = useState('');

  const displayNews = event => {
    this.newsList.forEach(element => {
      if (
        element.headline === event.target.textContent ||
        element.newsInput === event.target.textContent
      ) {
        setHeadline(event.target.parentNode.childNodes[0].textContent);
        setNewsInput(event.target.parentNode.childNodes[1].textContent);
      }
    });
  };

  const displayNewsList = () => {
    return newsList.map((element, index) => {
      return (
        <tr key={index} onClick={e => displayNews(e)}>
          <td>{element.headline}</td>
          <td>{element.newsInput}</td>
        </tr>
      );
    });
  };

  // console.log(this.displayNewsList());
  return (
    <div className="management-list">
      <h1>News List</h1>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>{displayNewsList()}</tbody>
      </table>
      <form>
        <input type="text" name="headline" id="headline" value={headline} onChange={() => {}} />
        <textarea name="news-input" id="news-input" value={newsInput} onChange={() => {}} />
      </form>
    </div>
  );
};

export default NewsList;
