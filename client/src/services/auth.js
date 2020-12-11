import axios from 'axios';

const signup = (username, imageURL, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age) => {
  return axios
  .post('/api/auth/signup', {username, imageURL, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age})
  .then(response => {
    return response.data
  })
  .catch(err => {
    return err.response.data
  });
}

const login = (username, password) => {
  return axios
  .post('api/auth/login', {username, password})
  .then(response => {
    return response.data
  })
  .catch(err => {
    return err.response.data;
  });
}

const logout = () => {
  return axios
  .delete('/api/auth/logout')
  .then(response => {
    return response.data
  })
  .catch(err => {
    return err.response.data;
  });
}

export {signup, login, logout};