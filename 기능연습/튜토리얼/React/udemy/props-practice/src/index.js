import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';
import faker from 'faker';

const App = () => {
  return (
    <div className="ui container comments">
      <CommentDetail
        avatar={faker.image.avatar()}
        author={faker.name.firstName()}
        timeAgo="오후 4시 45분"
        comment={faker.lorem.sentence()}
      />
      <CommentDetail
        avatar={faker.image.avatar()}
        author={faker.name.firstName()}
        timeAgo="어제"
        comment={faker.lorem.sentence()}
      />
      <CommentDetail
        avatar={faker.image.avatar()}
        author={faker.name.firstName()}
        timeAgo="3일 전"
        comment={faker.lorem.sentence()}
      />
      <CommentDetail
        avatar={faker.image.avatar()}
        author={faker.name.firstName()}
        timeAgo="1주일 전"
        comment={faker.lorem.sentence()}
      />
      <CommentDetail
        avatar={faker.image.avatar()}
        author={faker.name.firstName()}
        timeAgo="1년 전"
        comment={faker.lorem.sentence()}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));