import { Avatar } from '@mantine/core';
import toast from 'react-hot-toast';
import { BiCog } from 'react-icons/bi';
import { FiHome, FiLogOut, FiSearch } from 'react-icons/fi';
import { MdWorkspaces } from 'react-icons/md';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  selectActiveOrg,
  selectActiveOrgDetails,
} from '../../redux/slices/OrgSlice';
import { logout, selectUser } from '../../redux/slices/UserSlice';
import logo from './../../assets/images/logo.svg';
import './sidebar.css';

const Sidebar = ({ menuCollapse }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const activeOrg = useSelector(selectActiveOrg);
  const orgDetails = useSelector(selectActiveOrgDetails);
  const user = useSelector(selectUser);

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logout());
    toast.success('Succesfully Logout!');
    nav('/');
  };

  return (
    <>
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
            <Menu iconShape="circle">
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

              <SubMenu title={activeOrg.orgName} icon={<MdWorkspaces />}>
                {orgDetails.projects.map((project, i) => (
                  <MenuItem
                    key={i}
                    icon={
                      <Avatar src={project.image} radius="sm" size="24px" />
                    }
                  >
                    {project.name}
                    <Link to={`/dashboard/project?projectId=${project._id}`} />
                  </MenuItem>
                ))}
              </SubMenu>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="circle">
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
