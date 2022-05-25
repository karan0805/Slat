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
import { ListView } from './ListView';

const columnsFromBackend = {
  waitingforApproval: [],
  backlog: [],
  design: [],
  todos: [],
  inprogress: [],
  inreview: [],
  testing: [],
  completed: [],
};
const data = [
  {
    title: 'Athena Weissnat',
    status: '0',
    priority: '1',
    assignee: 'Sanket',
  },
  {
    title: 'Deangelo Runolfsson',
    status: '0',
    priority: '2',
    assignee: 'Karan',
  },
  {
    title: 'Danny Carter',
    status: '1',
    priority: '0',
    assignee: 'Yagvalkya',
  },
  {
    title: 'Trace Tremblay PhD',
    status: '2',
    priority: '2',
    assignee: 'Karan',
  },
  {
    title: 'Derek Dibbert',
    status: '2',
    priority: '1',
    assignee: 'Hitesh',
  },
  {
    title: 'Viola Bernhard',
    status: '1',
    priority: '0',
    assignee: 'Sanket',
  },
];

const BoardView = () => {
  const [boardDetails, setBoardDetails] = useState('');
  const [columns, setColumns] = useState(columnsFromBackend);
  const [listview, setListview] = useState(data);
  const [addTask, setAddTask] = useState(false);

  useEffect(() => {
    const queryparams = new URLSearchParams(window.location.search);
    const payload = queryparams.get('boardId');
    boardApi.getBoardData({ boardId: payload }).then((res) => {
      setBoardDetails(res.data.data);
      console.log(res.data.data);
    });
    boardApi
      .getBoardTickets({ boardId: payload })
      .then((res) => {
        if (res.status === 200) {
          setColumns(res.data.data);
          setListview(Object.values(res.data.data).flat(1));
          console.log('api call');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addTask]);

  return (
    <Container fluid style={{ padding: '0 50px' }}>
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
        <AvatarsGroup limit={3} total={4}>
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            component="a"
            href="https://github.com/karan0805"
          />
          <Avatar src="https://avatars.githubusercontent.com/u/61943065?s=400&u=806a6c80c755d133263a37c10df8cbf569dc4f1d&v=4" />
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
            <Board
              boardDetails={boardDetails}
              columns={columns}
              setColumns={setColumns}
              addTask={addTask}
              setAddTask={setAddTask}
            />
          </Tabs.Tab>
          <Tabs.Tab label="List View">
            <ListView listviewdata={listview} />
          </Tabs.Tab>
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
