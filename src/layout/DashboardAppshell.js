/* eslint-disable react/prop-types */
import Sidebar from '../components/Sidebar';

const DashboardAppshell = (props) => {
  return (
    <>
      <Sidebar />
      <main className="AppShell">{props.children}</main>
    </>
  );
};

export default DashboardAppshell;
