import { combineReducers } from 'redux';
import appStateReducer from './appState';
import mainStateReducer from './mainPageState';
import manaStateReducer from './manaPageState';

export default combineReducers({
  appState: appStateReducer,
  mainState: mainStateReducer,
  manaState: manaStateReducer
});
