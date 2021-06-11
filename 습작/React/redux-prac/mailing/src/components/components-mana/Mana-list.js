import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { newslist, selectedNews } from '../../actions';

const NewsList = ({ news, newslist, selectedNews, selected }) => {
  useEffect(() => {
    axios.get('http://localhost:3001/news/get').then(blob => newslist(blob.data));
    if (news.length === 0) return;
    console.log('this is news', news);
  }, [newslist]);

  const displayNews = event => {
    news.forEach(element => {
      if (
        element.title === event.target.textContent ||
        element.contents === event.target.textContent
      ) {
        selectedNews(
          event.target.parentNode.childNodes[0].textContent,
          event.target.parentNode.childNodes[1].textContent
        );
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
        <input
          type="text"
          name="headline"
          id="headline"
          value={selected.title}
          onChange={() => {}}
        />
        <textarea name="news-input" id="news-input" value={selected.contents} onChange={() => {}} />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    news: state.newsList,
    selected: state.selectedNews
  };
};

export default connect(mapStateToProps, { newslist, selectedNews })(NewsList);
