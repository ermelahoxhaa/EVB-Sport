import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  // marrim token nga localStorage dhe e shtojme ne headerin Authorization
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // ne rast se tokeni eshte i pavlefshëm ose i skaduar, largojme tokenin dhe userin nga localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;


