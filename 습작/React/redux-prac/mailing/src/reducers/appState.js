const appStateReducer = (appState = false, action) => {
  if (action.type === 'IS_MANAGEMENT_ACTIVE') {
    return action.payload;
  }
  return appState;
};

export default appStateReducer;
