export const USER_DATA = 'USER_DATA';
export const USER_IMAGE = 'USER_IMAGE';
export const PLAYER_SCORE = 'PLAYER_SCORE';
export const PLAYER_ANSWERS = 'PLAYER_ANSWERS';
export const PLAYER_ASSERTIONS = 'PLAYER_ASSERTIONS';

export const setUserData = (name, img) => ({
  type: USER_DATA,
  payload: {
    name,
    img,
  },
});

export const playerScore = (total) => ({
  type: PLAYER_SCORE,
  payload: total,
});

export const playerAnsweredQuestions = () => ({
  type: PLAYER_ANSWERS,
  payload: 1,
});

export const playerCorrectQuestions = () => ({
  type: PLAYER_ASSERTIONS,
  payload: 1,
});
