import { combineReducers } from 'redux';
import userDataReducer from './user';

const rootReducer = combineReducers({
  userDataReducer,
});

export default rootReducer;
