import { axiosInstance } from '../axios';

export const login = () => {
  return axiosInstance.get('/api/login');
};
