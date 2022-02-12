import { axiosInstance } from '../axios';

export const updatecontext = () => {
  return axiosInstance.get('/api/auth/updateContext');
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
