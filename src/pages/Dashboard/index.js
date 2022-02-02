/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/UserSlice';

const Dashboard = () => {
  const user = useSelector(selectUser);

  return <center>Good Morning. {user.userdata.fullName}</center>;
};

export default Dashboard;
