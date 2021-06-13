export const appStateReducer = (appState = false, action) => {
  if (action.type === 'IS_MANAGEMENT_ACTIVE') {
    return action.payload;
  }
  return appState;
};

export const mainStateReducer = (pageState = 'MainStart', action) => {
  if (action.type === 'CURRENT_PAGE_MAIN') {
    return action.payload;
  }
  return pageState;
};

export const manaStateReducer = (pageState = 'ManageMain', action) => {
  if (action.type === 'CURRENT_PAGE_MANA') {
    return action.payload;
  }
  return pageState;
};

export const memberStateReducer = (state = [], action) => {
  if (action.type === 'MEMBER_LIST') {
    const tempRawList = [...action.payload];
    const interestsToArray = tempRawList.map(element => element.interests.split(','));
    const listWithoutInterests = tempRawList.map(element => {
      const tempList = { ...element };
      delete tempList.interests;
      return tempList;
    });
    const listResult = listWithoutInterests.map((element, i) => {
      const tempList = { ...element };
      tempList.interests = interestsToArray[i];
      return tempList;
    });
    return listResult;
  }
  return state;
};

export const newsStateReducer = (state = [], action) => {
  if (action.type === 'NEWS_LIST') return action.payload;
  return state;
};

export const selectedNewsReducer = (state = {}, action) => {
  if (action.type === 'SELECTED_NEWS') return action.payload;
  return state;
};

export const selectedMemberReducer = (state = {}, action) => {
  if (action.type === 'MEMBER_INFO') return action.payload;
  return state;
};
