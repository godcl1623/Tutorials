import { combineReducers } from 'redux';
import * as reducers from './reducers';

export default combineReducers({
  appState: reducers.appStateReducer,
  mainState: reducers.mainStateReducer,
  manaState: reducers.manaStateReducer,
  memberList: reducers.memberStateReducer,
  newsList: reducers.newsStateReducer,
  selectedNews: reducers.selectedNewsReducer,
  selectedMember: reducers.selectedMemberReducer,
  oldMemberInfo: reducers.comparisonReducer
});
