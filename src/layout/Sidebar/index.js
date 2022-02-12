import { Modal } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiCog } from 'react-icons/bi';
import { FiHome, FiLogOut, FiSearch } from 'react-icons/fi';
import { MdWorkspaces } from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Invite2Org from '../../components/Invite2Org';
import { selectActiveOrg } from '../../redux/slices/OrgSlice';
import { logout, selectUser } from '../../redux/slices/UserSlice';
import logo from './../../assets/images/logo.svg';
import './sidebar.css';

const Sidebar = ({ menuCollapse }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const activeOrg = useSelector(selectActiveOrg);
  const user = useSelector(selectUser);

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
        <Invite2Org setInviteOpen={setInviteOpen} />
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
                active={window.location.pathname === '/dashboard/explore'}
                icon={<FiSearch />}
              >
                Explore
                <Link to="/dashboard/explore" />
              </MenuItem>
              <MenuItem
                active={window.location.pathname === '/dashboard/projects'}
                icon={<MdWorkspaces />}
              >
                {activeOrg.orgName}
                <Link to="/dashboard/projects" />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              {activeOrg.owner === user._id ? (
                <MenuItem
                  active={
                    window.location.pathname ===
                    '/dashboard/organizations/manage'
                  }
                  icon={<BiCog />}
                >
                  Org Settings
                  <Link to="/dashboard/organizations/manage" />
                </MenuItem>
              ) : null}
              <MenuItem
                onClick={() => {
                  setInviteOpen((prevCheck) => !prevCheck);
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
