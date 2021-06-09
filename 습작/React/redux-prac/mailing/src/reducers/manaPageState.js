const manaStateReducer = (pageState = 'ManageMain', action) => {
  if (action.type === 'CURRENT_PAGE_MANA') {
    return action.payload;
  }
  return pageState;
};

export default manaStateReducer;
