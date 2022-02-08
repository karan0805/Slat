import { Group, Avatar, Center, Tabs } from '@mantine/core';
import React from 'react';
import { BiCog } from 'react-icons/bi';
import Invite from './components/Invite';
import Members from './components/Members';
import Orgsettings from './components/Orgsettings';
import Teams from './components/Teams';

export default function Organization() {
  return (
    <Center>
      <Group direction="column">
        <Group>
          <Avatar
            src="https://avatars.dicebear.com/api/bottts/undefined.svg"
            alt="it's me"
          />
          <h1>Sanket Mense</h1>
        </Group>
        <Tabs color="cyan" tabPadding={5}>
          <Tabs.Tab label="Members" icon={<BiCog />}>
            <Members />
          </Tabs.Tab>
          <Tabs.Tab label="Teams" icon={<BiCog />}>
            <Teams />
          </Tabs.Tab>
          <Tabs.Tab label="Settings" icon={<BiCog />}>
            <Orgsettings />
          </Tabs.Tab>
          <Tabs.Tab label="Invite" icon={<BiCog />}>
            <Invite />
          </Tabs.Tab>
        </Tabs>
      </Group>
    </Center>
  );
}
