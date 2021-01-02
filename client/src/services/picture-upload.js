// client/src/services/upload.js
import axios from 'axios';

const errorHandler = err => {
  // console.error(err);
  throw err;
};

const Axios = axios.create({
  baseURL: 'http://localhost:5000',
  /* other custom settings */
});

export default {
  handleUpload(file) {
    console.log('file to be handled: ', file);
    return axios.post('/api/users/upload', file)
      .then(res => {
        console.log(res.data)
        return res.data
      })
      
      .catch(errorHandler);
  }
}