import { Modal } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiCog } from 'react-icons/bi';
import { FaList, FaRegHeart } from 'react-icons/fa';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { RiPencilLine, RiUserAddLine } from 'react-icons/ri';
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
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/UserSlice';
import logo from './../../assets/images/logo.svg';
import './sidebar.css';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ menuCollapse }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logout());
    toast.success('Succesfully Logout!');
    nav('/');
  };

  return (
    <>
      <Modal
        centered
        opened={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Organization Settings"
        overlayColor="#7f7f7f"
        overlayOpacity={0.25}
        radius={'md'}
        zIndex={5}
        styles={{
          root: { fontSize: '16px', padding: '0px' },
          inner: {},
          modal: {},
          header: {},
          title: { fontWeight: 'bold' },
          body: {},
        }}
      >
        hello
      </Modal>
      <Modal
        centered
        opened={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite Member To Organization"
        overlayColor="#7f7f7f"
        overlayOpacity={0.25}
        radius={'md'}
        zIndex={5}
        styles={{
          root: { fontSize: '16px', padding: '0px' },
          inner: {},
          modal: {},
          header: {},
          title: { fontWeight: 'bold' },
          body: {},
        }}
      >
        <>hello</>
      </Modal>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>
                {menuCollapse ? (
                  <span style={{ fontSize: '2rem' }}>
                    <img style={{ maxWidth: '30px' }} src={logo} alt="slat" />
                  </span>
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
              </p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                active={window.location.pathname === '/dashboard'}
                icon={<FiHome />}
              >
                Home
                <Link to="/" />
              </MenuItem>
              <MenuItem
                active={window.location.pathname === '/dashboard/projects'}
                icon={<FaList />}
              >
                Projects
                <Link to="/dashboard/projects" />
              </MenuItem>
              <MenuItem
                active={window.location.pathname === '/dashboard/boards'}
                icon={<FaRegHeart />}
              >
                Boards
                <Link to="/dashboard/boards" />
              </MenuItem>
              <MenuItem
                active={window.location.pathname === '/dashboard/inbox'}
                icon={<RiPencilLine />}
              >
                Inbox <Link to="/dashboard/inbox" />
              </MenuItem>
              <MenuItem
                active={window.location.pathname === '/dashboard/goals'}
                icon={<BiCog />}
              >
                Goals <Link to="/dashboard/goals" />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem
                onClick={() => {
                  setSettingsOpen((prevCheck) => !prevCheck);
                  setInviteOpen(false);
                }}
                icon={<BiCog />}
              >
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setInviteOpen((prevCheck) => !prevCheck);
                  setSettingsOpen(false);
                }}
                icon={<RiUserAddLine />}
              >
                Invite
              </MenuItem>
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
