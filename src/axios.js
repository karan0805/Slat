import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 10000,
  headers: {
    Authorization: window.localStorage.getItem('access_token'),
  },
});
