const mainStateReducer = (pageState = 'MainStart', action) => {
  if (action.type === 'CURRENT_PAGE_MAIN') {
    return action.payload;
  }
  return pageState;
};

export default mainStateReducer;
