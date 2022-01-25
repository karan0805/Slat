import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/UserSlice';

const Dashboard = () => {
  const user = useSelector(selectUser);

  return <div>Dashboard Bolte. Welcome {user.email}</div>;
};

export default Dashboard;
