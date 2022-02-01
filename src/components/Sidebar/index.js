import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiCog } from 'react-icons/bi';
//import icons from react icons
import { FaList, FaRegHeart } from 'react-icons/fa';
import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiHome,
  FiLogOut,
} from 'react-icons/fi';
import { RiPencilLine, RiUserAddLine } from 'react-icons/ri';
//import react pro sidebar components
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch } from 'react-redux';
//import sidebar css from react-pro-sidebar module and our custom css
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/UserSlice';
import logo from './../../assets/images/logo.svg';
import './sidebar.css';

const Sidebar = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(
      login({
        email: '',
        token: '',
        loggedIn: false,
      }),
    );
    toast.success('Succesfully Logout!');
    nav('/');
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>
                {menuCollapse ? (
                  <img style={{ maxWidth: '30px' }} src={logo} alt="slat" />
                ) : (
                  <span style={{ fontSize: '2rem' }}>
                    <img
                      style={{ maxWidth: '30px', marginRight: '10px' }}
                      src={logo}
                      alt="slat"
                    />
                    Slat
                  </span>
                )}
                <div className="closemenu" onClick={menuIconClick}>
                  {menuCollapse ? (
                    <FiArrowRightCircle />
                  ) : (
                    <FiArrowLeftCircle />
                  )}
                </div>
              </p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                Home
                <Link to="/" />
              </MenuItem>
              <MenuItem icon={<FaList />}>
                Projects
                <Link to="/dashboard/projects" />
              </MenuItem>
              <MenuItem icon={<FaRegHeart />}>
                Boards
                <Link to="/dashboard/boards" />
              </MenuItem>
              <MenuItem icon={<RiPencilLine />}>
                Inbox <Link to="/dashboard/inbox" />
              </MenuItem>
              <MenuItem icon={<BiCog />}>
                Goals <Link to="/dashboard/goals" />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
              <MenuItem icon={<RiUserAddLine />}>Invite</MenuItem>
              <MenuItem icon={<FiLogOut />} onClick={logoutHandler}>
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
