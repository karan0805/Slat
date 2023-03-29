/* eslint-disable react/prop-types */
import Navbar from './Navbar';
import Footer from './Footer';

const HomeAppShell = (props) => {
  return (
    <>
      <Navbar />
      <main className="AppShell">{props.children}</main>
      <Footer />
    </>
  );
};

export default HomeAppShell;
