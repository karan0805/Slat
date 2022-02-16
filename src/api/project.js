import { axiosInstance } from '../axios';

export const addProject = (payload) => {
  return axiosInstance.post('/api/project/addProject', payload);
};
