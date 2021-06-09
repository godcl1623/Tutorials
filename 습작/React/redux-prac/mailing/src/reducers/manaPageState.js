const manaStateReducer = (pageState = 'ManageMain', action) => {
  if (action.type === 'CURRENT_PAGE') {
    return action.payload;
  }
  return pageState;
};

export default manaStateReducer;
