import { combineReducers } from 'redux';
import appStateReducer from './appState';
import mainStateReducer from './mainPageState';
import manaStateReducer from './manaPageState';
import memberStateReducer from './memberState';
import newsStateReducer from './newsState';
import selectedNewsReducer from './selectedState';

export default combineReducers({
  appState: appStateReducer,
  mainState: mainStateReducer,
  manaState: manaStateReducer,
  memberList: memberStateReducer,
  newsList: newsStateReducer,
  selectedNews: selectedNewsReducer
});
