/* eslint-disable react/prop-types */
import Sidebar from '../components/Sidebar';
import DashNavbar from '../components/DashNavbar';
import React, { useState } from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.menuCollapse ? '80px 1fr' : '220px 1fr'};
`;

const DashboardAppshell = (props) => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  return (
    <Wrapper menuCollapse={menuCollapse}>
      <div>
        <Sidebar menuCollapse={menuCollapse} />
      </div>
      <div>
        <DashNavbar
          menuCollapse={menuCollapse}
          setMenuCollapse={setMenuCollapse}
        />
        {props.children}
      </div>
    </Wrapper>
  );
};

export default DashboardAppshell;
