import { axiosInstance } from '../axios';

export const updatecontext = (payload) => {
  return axiosInstance.post('/api/auth/updateContext', payload);
};

export const loginUser = (email, pwd) => {
  return axiosInstance.post('/api/auth/login', { email: email, password: pwd });
};
export const signupUser = (fname, email, pwd) => {
  return axiosInstance.post('/api/auth/register', {
    fullName: fname,
    email: email,
    password: pwd,
  });
};
export const forgotUser = (email) => {
  return axiosInstance.post('/api/auth/forgot-pswd', {
    email: email,
  });
};
export const resetUser = (password) => {
  return axiosInstance.post('/api/auth/reset-pswd', {
    password: password,
  });
};

export const profileSettings = (payload) => {
  return axiosInstance.post('/api/users/usersettings', payload);
};

export const resetPassword = (payload) => {
  return axiosInstance.post('/api/users/changepassword', payload);
};
