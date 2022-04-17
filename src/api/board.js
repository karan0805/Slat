import { axiosInstance } from '../axios';

export const getBoardData = (payload) => {
  return axiosInstance.post('/api/board/getBoardDetails', payload);
};

export const updateBoard = (payload) => {
  return axiosInstance.post('/api/board/updateBoard', payload);
};
