import { axiosInstance } from '../axios';

export const addProject = (payload) => {
  return axiosInstance.post('/api/project/addProject', payload);
};
export const getProject = (payload) => {
  return axiosInstance.post('/api/project/getProjectDetails', payload);
};

export const getMembers = (payload) => {
  return axiosInstance.post('/api/project/getMembers', payload);
};

export const addBoard = (payload) => {
  return axiosInstance.post('/api/project/addProjectBoard', payload);
};
export const getBoards = (payload) => {
  return axiosInstance.post('/api/project/getProjectBoards', payload);
};
