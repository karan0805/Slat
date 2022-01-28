import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/UserSlice';

const Dashboard = () => {
  const user = useSelector(selectUser);

  return <>Welcome to Slat, {user.email}</>;
};

export default Dashboard;
