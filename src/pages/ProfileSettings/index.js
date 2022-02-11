/* eslint-disable no-unused-vars */
import { Avatar, Container, Group, Tabs, Title } from '@mantine/core';
import { BiCog } from 'react-icons/bi';
import { GiSettingsKnobs } from 'react-icons/gi';
import { RiUserAddLine, RiGroupLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { selectActiveOrg } from '../../redux/slices/OrgSlice';
import Invite from './components/Invite';
import Members from './components/Members';
import Orgsettings from './components/Orgsettings';
import Manage from './components/Manage';

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
        <Tabs.Tab label="Settings" icon={<BiCog />}>
          <Orgsettings />
        </Tabs.Tab>
        <Tabs.Tab label="Members" icon={<RiGroupLine />}>
          <Members />
        </Tabs.Tab>
        <Tabs.Tab label="Invite" icon={<RiUserAddLine />}>
          <Invite />
        </Tabs.Tab>
        <Tabs.Tab label="Manage" icon={<GiSettingsKnobs />}>
          <Manage />
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
}
