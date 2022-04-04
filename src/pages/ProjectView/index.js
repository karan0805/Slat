import { Container, Tabs } from '@mantine/core';
import React from 'react';
import { Board } from './components/Board.js';
import { Member } from './components/Member.js';

export const ProjectView = () => {
  return (
    <Container>
      <Tabs grow>
        <Tabs.Tab label="Boards">
          <Board />
        </Tabs.Tab>
        <Tabs.Tab label="Members">
          <Member />
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
};
