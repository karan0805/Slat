import { Group, Avatar, Center, Tabs } from '@mantine/core';
import React from 'react';
import { BiCog } from 'react-icons/bi';

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
        <Tabs color="cyan" tabPadding={100}>
          <Tabs.Tab label="Members" icon={<BiCog />}>
            Gallery tab content
          </Tabs.Tab>
          <Tabs.Tab label="Teams" icon={<BiCog />}>
            Messages tab content
          </Tabs.Tab>
          <Tabs.Tab label="Settings" icon={<BiCog />}>
            Settings tab content
          </Tabs.Tab>
          <Tabs.Tab label="Invite" icon={<BiCog />}>
            Messages tab content
          </Tabs.Tab>
        </Tabs>
      </Group>
    </Center>
  );
}
