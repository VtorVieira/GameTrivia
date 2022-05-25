import md5 from 'crypto-js/md5';

export const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const getImg = async (email) => {
  const imgHash = md5(email).toString();
  const url = `https://www.gravatar.com/avatar/${imgHash}`;
  return url;
};

export const getQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
