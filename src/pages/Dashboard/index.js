/* eslint-disable no-unused-vars */
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/UserSlice';
import styled from 'styled-components';

export const Time = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  line-height: 20px;
  margin-bottom: 4px;
  color: #1e1f21;
  font-weight: 500;
  font-family: 'Segoe UI';
`;

export const Greet = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  line-height: 40px;
  color: #1e1f21;
  font-weight: 400;
  font-family: 'Segoe UI';
`;

const Dashboard = () => {
  const user = useSelector(selectUser);
  var myDate = new Date();
  var hrs = myDate.getHours();

  let greet;

  if (hrs < 12) greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening';

  return (
    <>
      <Time>{moment().format('dddd, MMMM D')}</Time>
      <Greet>
        {greet}, {user.fullName}
      </Greet>
    </>
  );
};

export default Dashboard;
