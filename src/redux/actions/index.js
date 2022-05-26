export const USER_DATA = 'USER_DATA';
export const USER_IMAGE = 'USER_IMAGE';
export const PLAYER_DATA = 'PLAYER_DATA';

export const setUserData = (name, img) => ({
  type: USER_DATA,
  payload: {
    name,
    img,
  },
});

export const playerData = (total) => ({
  type: PLAYER_DATA,
  payload: total,
});
