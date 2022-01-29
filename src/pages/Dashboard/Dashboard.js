import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import { selectUser } from '../../redux/slices/UserSlice';

const Dashboard = () => {
  const nav = useNavigate();
  const user = useSelector(selectUser);

  const submitHandler = () => {
    axiosInstance.get('/api/users');
  };

  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    toast.success('Succesfully Logout!');
    nav('/');
  };

  return (
    <>
      Welcome to Slat, {user?.email}
      <button onClick={submitHandler}>Get User</button>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Dashboard;
