import { PLAYER_SCORE, PLAYER_ANSWERS, PLAYER_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
    name: '',
    answers: 1,
    assertions: 0,
    score: 0,
    gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case PLAYER_ANSWERS:
  return {
    ...state,
    score: state.answers + action.payload,
  };
  case PLAYER_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  default:
    return state;
  }
};

export default player;
