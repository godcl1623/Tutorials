const newsStateReducer = (state = [], action) => {
  if (action.type === 'NEWS_LIST') return action.payload;
  return state;
};

export default newsStateReducer;
