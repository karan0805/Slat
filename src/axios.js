import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 10000,
  headers: {
    Authorization: window.localStorage.getItem('access_token'),
  },
});
