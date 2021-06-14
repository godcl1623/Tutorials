import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { newslist, selectedNews } from '../../actions';
import { Title, Contents } from '../common/newsForm';

const NewsList = ({ news, newslist, selectedNews, selected }) => {
  console.log(selected);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
    setValue
  } = useForm();

  useEffect(() => {
    const getNews = async () => {
      const result = await axios
        .get('http://localhost:3001/news/get')
        .then(blob => newslist(blob.data))
        .then(result => {
          setValue('title', selected.title);
          setValue('contents', selected.contents);
        });
      return result;
    };
    getNews();
    if (isSubmitSuccessful) {
      reset();
    }
  }, [newslist, isSubmitSuccessful, reset, selected]);

  const displayNews = event => {
    console.log(event.target.parentNode.childNodes);
    news.forEach(element => {
      if (
        element.title === event.target.textContent ||
        element.contents === event.target.textContent
      ) {
        selectedNews(
          element.id,
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
          <td>
            <button
              onClick={() => {
                console.log(element);
                fetch('http://localhost:3001/news/delete', {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(element)
                })
                  .then(() => console.log('Data Post Success !'))
                  .catch(err => console.error(err));
              }}
            >
              삭제
            </button>
          </td>
        </tr>
      );
    });
  };

  const onSubmitSuccess = data => {
    fetch(`http://localhost:3001/news/update/${selected.id}`, {
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

  // console.log(this.displayNewsList());
  return (
    <div className="management-list">
      <h1>News List</h1>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>내용</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>{displayNewsList()}</tbody>
      </table>
      <form onSubmit={handleSubmit(onSubmitSuccess, onError)}>
        <Title type="text" register={register} name="title" id="headline" />
        <Contents register={register} name="contents" id="news-input" />
        <input type="submit" />
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
