import { axiosInstance } from '../axios';

export const addOrg = (org) => {
  return axiosInstance.post('/api/org/addorg', { orgName: org });
};

export const switchOrg = (orgid) => {
  return axiosInstance.post('/api/org/switchorg', { orgId: orgid });
};
