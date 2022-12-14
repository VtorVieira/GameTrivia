import { PLAYER_SCORE,
  PLAYER_ANSWERS, PLAYER_ASSERTIONS, RESET_GLOBAL_STATE } from '../actions';

const INITIAL_STATE = {
  name: '',
  answers: 0,
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
      answers: state.answers + action.payload,
    };
  case PLAYER_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  case RESET_GLOBAL_STATE:
    return {
      ...state,
      score: 0,
      assertions: 0,
      answers: 0,
    };
  default:
    return state;
  }
};

export default player;
