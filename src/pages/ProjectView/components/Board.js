import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Group, ThemeIcon, Text, Avatar } from '@mantine/core';
import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { projectApi } from '../../../api';
import CreateBoard from '../../../components/CreateBoard';

export const Board = () => {
  const nav = useNavigate();
  const [boards, setBoards] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [addBoard, setAddBoard] = useState(false);

  useEffect(() => {
    const queryparams = new URLSearchParams(window.location.search);
    setProjectId(queryparams.get('projectId'));

    projectApi
      .getBoards({ projectId: queryparams.get('projectId') })
      .then((res) => {
        if (res.data.status === 200) {
          setBoards(res.data.data);
        }
      });
  }, [addBoard]);

  return (
    <>
      <CreateBoard
        addBoard={addBoard}
        setAddBoard={setAddBoard}
        projectId={projectId}
      />
      <SimpleGrid cols={3}>
        <Box
          onClick={() => {
            setAddBoard(true);
          }}
          sx={() => ({
            margin: '10px',
            display: 'block',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '4px',
            fontWeight: '500',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          })}
        >
          <Group direction="column" position="center">
            <ThemeIcon
              variant="light"
              size="80px"
              radius="40px"
              color="grey"
              style={{ border: '1px dashed black' }}
            >
              <BiPlus />
            </ThemeIcon>
            <Text>Add Board</Text>
          </Group>
        </Box>
        {boards.map((board) => (
          <Box
            key={board._id}
            onClick={() => {
              nav('/dashboard/board?boardId=' + board._id);
            }}
            sx={() => ({
              display: 'block',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '5px',
              fontWeight: '500',
              margin: '10px',

              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            })}
          >
            <Group direction="column" position="center">
              <Avatar src={board.image} radius="40px" size="80px" />
              <Text>{board.name}</Text>
            </Group>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
