export const difficultyNumber = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 1
    case 'medium':
      return 2
    case 'hard':
      return 3
    default:
      break;
  }
}

export const totalScore = (timer, level) => {
  const BASE_POINT = 10;
  const result = BASE_POINT + (timer * level);
  return result;
}
