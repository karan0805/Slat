import { axiosInstance } from '../axios';

export const addComment = (payload) => {
  return axiosInstance.post('/api/board/addComment', payload);
};

export const getComments = (payload) => {
  return axiosInstance.post('/api/board/getComments', payload);
};

export const deleteTicket = (payload) => {
  return axiosInstance.post('/api/board/deleteTicket', payload);
};

export const assignTicket = (payload) => {
  return axiosInstance.post('/api/board/assignTicket', payload);
};
