export const USER_DATA = 'USER_DATA';
export const USER_IMAGE = 'USER_IMAGE';

export const setUserData = (name, img) => ({
  type: USER_DATA,
  name,
  img,
});
