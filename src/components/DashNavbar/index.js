/* eslint-disable no-unused-vars */
import {
  Autocomplete,
  Avatar,
  Divider,
  Group,
  Menu,
  UnstyledButton,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsGear, BsTrash } from 'react-icons/bs';
import {
  FiArrowLeftCircle,
  FiLogOut,
  FiPlusCircle,
  FiSearch,
} from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrOrganization } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../../redux/slices/UserSlice';
import CreateOrg from '../CreateOrg';
import { Nav, NavbarContainer } from './DashNavbar.styled';
import { Modal } from '@mantine/core';

// eslint-disable-next-line react/prop-types
const DashNavbar = ({ menuCollapse, setMenuCollapse }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const [title, setTitle] = useState('');
  const [addOrg, setAddOrg] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname === '/dashboard' ||
      window.location.pathname === '/dashboard/'
    ) {
      setTitle('Home');
    } else if (window.location.pathname === '/dashboard/projects') {
      setTitle('Projects');
    } else if (window.location.pathname === '/dashboard/boards') {
      setTitle('Boards');
    } else if (window.location.pathname === '/dashboard/inbox') {
      setTitle('Inbox');
    } else if (window.location.pathname === '/dashboard/goals') {
      setTitle('Goals');
    } else if (window.location.pathname === '/dashboard/organization') {
      setTitle('Organization Settings');
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
            <span style={{ fontSize: '1.5rem' }}>{title}</span>
          </Group>
          <Group position="right">
            <Autocomplete
              placeholder="Search"
              icon={<FiSearch />}
              radius="lg"
              data={[
                'Create an Organization',
                'Join an Organization',
                'Create a Project',
                'Create a Board',
              ]}
              nothingFound="No results found"
              onItemSubmit={(item) => {
                alert(item.value);
              }}
              zIndex={9999}
            />
            <Menu
              withArrow
              placement="end"
              shadow="xl"
              size={'lg'}
              zIndex={9999}
              control={
                <UnstyledButton>
                  <Group>
                    <Avatar color="cyan" radius="xl">
                      KG
                    </Avatar>
                  </Group>
                </UnstyledButton>
              }
            >
              <Menu.Label>Signed in as {user.userdata.fullName}</Menu.Label>
              <Divider />
              <Menu.Item icon={<GrOrganization />}>
                {user.userdata.username}&apos;s Workspace
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setAddOrg((prevCheck) => !prevCheck);
                }}
                icon={<FiPlusCircle />}
              >
                Add New Organization
              </Menu.Item>
              <Menu.Item icon={<BsGear />}>My Profile and Settings</Menu.Item>
              <Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item onClick={logoutHandler} icon={<FiLogOut />}>
                Log Out
              </Menu.Item>
              <Menu.Item color="red" icon={<BsTrash />}>
                Delete my account
              </Menu.Item>
            </Menu>
          </Group>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default DashNavbar;
