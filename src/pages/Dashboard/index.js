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
  margin-top: 20px;
  margin-bottom: 10px;
  font-color: #1e1f21;
  font-weight: 500;
`;

export const Greet = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  line-height: 40px;
  font-color: #1e1f21;
  font-weight: 400;
`;

const Dashboard = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <Time>{moment().format('dddd, MMMM D')}</Time>
      <Greet> Good Morning, {user.fullName}</Greet>
    </>
  );
};

export default Dashboard;
