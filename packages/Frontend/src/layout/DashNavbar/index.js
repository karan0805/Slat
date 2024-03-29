/* eslint-disable no-unused-vars */
import {
  Avatar,
  Divider,
  Group,
  Menu,
  Modal,
  UnstyledButton,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsGear, BsTrash } from 'react-icons/bs';
import { FiArrowLeftCircle, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrOrganization } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orgApi } from '../../api';
import CreateOrg from '../../components/CreateOrg';
import { selectActiveOrg, switchOrg } from '../../redux/slices/OrgSlice';
import { logout, selectUser } from '../../redux/slices/UserSlice';
import { Nav, NavbarContainer } from './DashNavbar.styled';

const DashNavbar = ({ menuCollapse, setMenuCollapse }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const activeOrg = useSelector(selectActiveOrg);
  const [title, setTitle] = useState('');
  const [addOrg, setAddOrg] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/dashboard') {
      setTitle('Home');
    } else if (window.location.pathname === '/dashboard/project') {
      setTitle('Project');
    } else if (window.location.pathname === '/dashboard/explore') {
      setTitle('Explore');
    } else if (window.location.pathname === '/dashboard/organizations/manage') {
      setTitle('Organization Settings');
    } else if (window.location.pathname === '/dashboard/account/manage') {
      setTitle('Account Settings');
    }
  });

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const logoutHandler = () => {
    localStorage.clear();
    nav('/');
    dispatch(logout());
    toast.success('Succesfully Logout!');
  };

  const switchOrgHandler = (id) => {
    if (id !== activeOrg._id) {
      orgApi.switchCurrentOrg(id).then(
        (response) => {
          if (response.data.status == 200) {
            toast.success('Successfully Switched Organization');
            dispatch(switchOrg(response.data.data));
            nav('/dashboard');
          }
        },
        (err) => {
          const errmsg = err.response.data.message;
          toast.error(errmsg);
        },
      );
    }
  };

  return (
    <>
      <Modal
        centered
        opened={addOrg}
        onClose={() => setAddOrg(false)}
        title="Create New Organization"
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
        <CreateOrg setAddOrg={setAddOrg} />
      </Modal>
      <Nav>
        <NavbarContainer iscollapsed={menuCollapse}>
          <Group className="closemenu" onClick={menuIconClick}>
            {menuCollapse ? <GiHamburgerMenu /> : <FiArrowLeftCircle />}
            <span style={{ fontSize: '1.25rem', fontWeight: 500 }}>
              {title}
            </span>
          </Group>
          <Group position="right">
            <Menu
              delay={100}
              withArrow
              placement="end"
              shadow="xl"
              size={'lg'}
              zIndex={9999}
              control={
                <UnstyledButton>
                  <Group>
                    <Avatar
                      src={`https://avatars.dicebear.com/api/initials/${user.fullName}.svg`}
                      alt="it's me"
                      radius="xl"
                    />
                  </Group>
                </UnstyledButton>
              }
            >
              <Menu.Label>Signed in as {user.fullName}</Menu.Label>
              <Divider />
              {user.org.map((org) => (
                <Menu.Item
                  key={org._id}
                  onClick={(e) => {
                    e.preventDefault();
                    switchOrgHandler(org._id);
                  }}
                  icon={<GrOrganization />}
                >
                  {org.orgName}
                </Menu.Item>
              ))}
              <Menu.Item
                onClick={() => {
                  setAddOrg((prevCheck) => !prevCheck);
                }}
                icon={<FiPlusCircle />}
              >
                Add New Organization
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  nav('/dashboard/account/manage');
                }}
                icon={<BsGear />}
              >
                My Profile and Settings
              </Menu.Item>
              <Menu.Item onClick={logoutHandler} icon={<FiLogOut />}>
                Log Out
              </Menu.Item>
            </Menu>
          </Group>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default DashNavbar;
