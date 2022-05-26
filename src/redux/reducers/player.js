import { PLAYER_DATA } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_DATA:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
