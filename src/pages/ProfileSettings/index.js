/* eslint-disable no-unused-vars */
import { Avatar, Container, Group, Tabs, Title } from '@mantine/core';

import { useSelector } from 'react-redux';
import { selectActiveOrg } from '../../redux/slices/OrgSlice';
import Profile from './components/Profile';
import Organisation from './components/Organisation';
import Notification from './components/Notification';

export default function ProfileSettings() {
  const activeOrg = useSelector(selectActiveOrg);

  return (
    <Container size={1000} style={{ marginTop: '100px' }}>
      <Group style={{ marginBottom: '50px' }}>
        <Avatar
          src={`https://avatars.dicebear.com/api/identicon/${activeOrg.orgName}.svg`}
          alt="org"
        />
        <Title style={{ fontFamily: 'Poppins' }}>{activeOrg.orgName}</Title>
      </Group>
      <Tabs
        color="cyan"
        tabPadding={5}
        grow
        styles={{
          tabsListWrapper: {},
          tabsList: {},
          body: {},
          tabControl: { fontSize: '1.1rem' },
          tabActive: {},
          tabInner: {},
          tabLabel: {},
        }}
      >
        <Tabs.Tab label="Profile">
          <Profile />
        </Tabs.Tab>
        <Tabs.Tab label="Notification">
          <Notification />
        </Tabs.Tab>
        <Tabs.Tab label="Organizations">
          <Organisation />
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
}
