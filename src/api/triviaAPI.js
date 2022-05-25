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
  console.log(url);
  return url;
};
