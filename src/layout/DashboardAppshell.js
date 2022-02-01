/* eslint-disable react/prop-types */
import Sidebar from '../components/Sidebar';
import DashNavbar from '../components/DashNavbar';
import React, { useState } from 'react';

const DashboardAppshell = (props) => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  return (
    <>
      <Sidebar menuCollapse={menuCollapse} />
      <DashNavbar
        menuCollapse={menuCollapse}
        setMenuCollapse={setMenuCollapse}
      />
      <div className="AppShell2">{props.children}</div>
    </>
  );
};

export default DashboardAppshell;
