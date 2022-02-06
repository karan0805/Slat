import { axiosInstance } from '../axios';

export const addOrg = (org) => {
  return axiosInstance.post('/api/org/addorg', { orgName: org });
};
