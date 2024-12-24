import { combineReducers } from 'redux';
import settings from './settings/settings.reducers';
import boards from '../components/Board/state/boards.reducers';

const appReducer = combineReducers({
  settings,
  boards,
});

export default (state, action) => {
  return appReducer(state, action);
};