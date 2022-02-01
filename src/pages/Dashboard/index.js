import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/UserSlice';

const Dashboard = () => {
  const user = useSelector(selectUser);

  return <>Good Morning, {user.userdata}</>;
};

export default Dashboard;
