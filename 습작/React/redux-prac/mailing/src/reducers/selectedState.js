const selectedNewsReducer = (state = {}, action) => {
  if (action.type === 'SELECTED_NEWS') return action.payload;
  return state;
};

export default selectedNewsReducer;
