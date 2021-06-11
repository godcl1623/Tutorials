import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { newslist } from '../../actions';

const NewsList = ({ news, newslist }) => {
  useEffect(() => {
    axios.get('http://localhost:3001/news/get').then(blob => newslist(blob.data));
    if (news.length === 0) return;
    console.log('this is news', news);
  }, [newslist]);

  const [headline, setHeadline] = useState('');
  const [newsInput, setNewsInput] = useState('');

  const displayNews = event => {
    news.forEach(element => {
      if (
        element.title === event.target.textContent ||
        element.contents === event.target.textContent
      ) {
        setHeadline(event.target.parentNode.childNodes[0].textContent);
        setNewsInput(event.target.parentNode.childNodes[1].textContent);
      }
    });
  };

  const displayNewsList = () => {
    return news.map((element, index) => {
      return (
        <tr key={index} onClick={e => displayNews(e)}>
          <td>{element.title}</td>
          <td>{element.contents}</td>
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

const mapStateToProps = state => {
  return { news: state.newsList };
};

export default connect(mapStateToProps, { newslist })(NewsList);
