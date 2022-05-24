import { axiosInstance } from '../axios';

export const getBoardData = (payload) => {
  return axiosInstance.post('/api/board/getBoardData', payload);
};

export const getBoardTickets = (payload) => {
  return axiosInstance.post('/api/board/getBoardTickets', payload);
};

export const updateBoardTickets = (payload) => {
  return axiosInstance.post('/api/board/updateBoardTickets', payload);
};

export const updateBoardTicketsSameLevel = (payload) => {
  return axiosInstance.post('/api/board/updateBoardTicketsSameLevel', payload);
};

export const addTicket = (payload) => {
  return axiosInstance.post('/api/board/addTicket', payload);
};
