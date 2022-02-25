import { Container, Tabs } from '@mantine/core';
import React from 'react';
import { Board } from './components/Board.js';
import { Dashboard } from './components/Dashboard.js';
import { Member } from './components/Member.js';
import { Overview } from './components/Overview.js';

export const ProjectView = () => {
  return (
    <Container>
      <Tabs grow>
        <Tabs.Tab label="Overview">
          <Overview />
        </Tabs.Tab>
        <Tabs.Tab label="Board">
          <Board />
        </Tabs.Tab>
        <Tabs.Tab label="Dashboard">
          <Dashboard />
        </Tabs.Tab>
        <Tabs.Tab label="Members">
          <Member />
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
};
