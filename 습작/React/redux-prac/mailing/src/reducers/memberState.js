const memberStateReducer = (state = [], action) => {
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

export default memberStateReducer;
