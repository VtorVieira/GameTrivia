import { USER_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  img: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA:
    console.log(action);
    return {
      ...state,
      name: action.payload.name,
      img: action.payload.img,
    };
  default:
    return state;
  }
};

export default userReducer;
