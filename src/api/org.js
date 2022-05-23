import { axiosInstance } from '../axios';

export const addOrg = (orgName, orgDesc) => {
  return axiosInstance.post('/api/org/addOrg', {
    orgName: orgName,
    orgDesc: orgDesc,
  });
};

export const joinOrg = (orgid) => {
  return axiosInstance.post('/api/org/joinOrg', { orgId: orgid });
};

export const inviteOrg = (payload) => {
  console.log(payload);
  return axiosInstance.post('/api/org/inviteOrg', payload);
};

export const switchCurrentOrg = (orgid) => {
  return axiosInstance.post('/api/org/switchOrg', { orgId: orgid });
};

export const leaveOrg = (orgid) => {
  return axiosInstance.post('/api/org/leaveOrg', { orgId: orgid });
};

export const orgSettings = (activeOrg, orgName, orgDesc) => {
  return axiosInstance.post('/api/org/orgSettings', {
    activeOrg,
    orgName,
    orgDesc,
  });
};

export const getMembers = (activeOrg) => {
  return axiosInstance.post('/api/org/getmembers', { activeOrg });
};

export const deleteOrg = (activeOrg) => {
  return axiosInstance.post('/api/org/deleteOrg', { activeOrg });
};

export const getProjects = (activeOrg) => {
  return axiosInstance.post('/api/org/getprojects', { activeOrg });
};
