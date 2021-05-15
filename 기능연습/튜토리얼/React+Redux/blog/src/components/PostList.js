import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

const PostList = ({fetchPosts}) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return(
    <div>
      <h1>PostList</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return null;
};

export default connect(null, { fetchPosts })(PostList);