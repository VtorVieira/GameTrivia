export const difficultyNumber = (difficulty) => {
  const one = 1;
  const two = 2;
  const three = 3;
  switch (difficulty) {
  case 'easy':
    return one;
  case 'medium':
    return two;
  case 'hard':
    return three;
  default:
    break;
  }
};

export const totalScore = (timer, level) => {
  const BASE_POINT = 10;
  const result = BASE_POINT + (timer * level);
  return result;
};
