/* eslint-disable react/prop-types */
import Navbar from '../components/Navbar/Navbar';

const HomeAppShell = (props) => {
  return (
    <>
      <Navbar />
      <main className="AppShell">{props.children}</main>
    </>
  );
};

export default HomeAppShell;
