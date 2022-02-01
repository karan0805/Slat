/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../axios';
import { selectUser } from '../../redux/slices/UserSlice';

const Dashboard = () => {
  const user = useSelector(selectUser);

  const submitHandler = () => {
    axiosInstance.get('/api/users');
  };

  return <></>;
};

export default Dashboard;
