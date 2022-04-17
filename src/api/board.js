import { axiosInstance } from '../axios';

export const addBoard = (payload) => {
  return axiosInstance.post('/api/board/addBoard', payload);
};

export const updateBoards = (payload) => {
  return axiosInstance.post('/api/board/updateBoards', payload);
};

export const getBoardData = (payload) => {
  return axiosInstance.post('/api/board/getBoardDetails', payload);
};
