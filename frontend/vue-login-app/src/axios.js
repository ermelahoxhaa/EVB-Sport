import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

instance.interceptors.request.use(
  response => response,
  error => {
  if (error.response && error.response.status === 401) {
   window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default instance;
