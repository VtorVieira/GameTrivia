import { USER_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  img: '',
};

const userDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA:
    console.log(action);
    return {
      ...state,
      name: action.name,
      img: action.img,
    };
  default:
    return state;
  }
};

export default userDataReducer;
