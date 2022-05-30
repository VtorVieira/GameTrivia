import { combineReducers } from 'redux';
import player from './player';
import userReducer from './user';

const rootReducer = combineReducers({
  userReducer,
  player,
});

export default rootReducer;
