import {
  Avatar,
  AvatarsGroup,
  Container,
  Group,
  Space,
  Tabs,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { boardApi } from '../../api';
import { VscSettingsGear } from 'react-icons/vsc';
import { Board } from './Board';

const BoardView = () => {
  const [boardDetails, setBoardDetails] = useState('');
  useEffect(() => {
    const queryparams = new URLSearchParams(window.location.search);
    const payload = queryparams.get('boardId');
    boardApi.getBoardData({ boardId: payload }).then((res) => {
      setBoardDetails(res.data.data);
    });
  }, []);

  return (
    <Container>
      <Title
        order={2}
        style={{
          fontSize: '16px',
          lineHeight: '19.09px',
          fontWeight: '500',
        }}
      >
        {boardDetails?.project?.name}
      </Title>
      <Group position="apart">
        <Title
          order={2}
          style={{
            fontSize: '36px',
            lineHeight: '42.19px',
            fontWeight: '400',
          }}
        >
          {boardDetails?.name?.toUpperCase() + ' BOARD'}
        </Title>
        <AvatarsGroup limit={3} total={7}>
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            component="a"
            href="https://github.com/rtivital"
          />
          <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" />
        </AvatarsGroup>
      </Group>
      <Space h="46px" />
      <Group position="apart">
        <Tabs
          variant="pills"
          styles={{
            tabActive: {
              color: '#5046E5 !important',
              background: 'rgb(80, 70, 229,0.1) !important',
            },
            tabLabel: {},
          }}
        >
          <Tabs.Tab label="Board">
            <Board />
          </Tabs.Tab>
          <Tabs.Tab label="CheckList">Messages tab content</Tabs.Tab>
          <Tabs.Tab label="Settings" icon={<VscSettingsGear />}>
            Settings tab content
          </Tabs.Tab>
        </Tabs>
        <Group></Group>
      </Group>
    </Container>
  );
};

export default BoardView;
