import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({type: 'FETCH_USER', payload: response.data});
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = getState().posts.map(element => element.userId).filter((ids, index, self) => self.indexOf(ids) === index);
  userIds.forEach(userId => dispatch(fetchUser(userId)));
}