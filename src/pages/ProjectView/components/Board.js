import React, { useState } from 'react';
import { SimpleGrid, Box, Group, ThemeIcon, Text, Avatar } from '@mantine/core';
import { BiPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import AddBoard from './AddBoard';

export const Board = () => {
  const nav = useNavigate();
  const card = ['design', 'development', 'testing', 'qa', 'release'];

  const [addBoard, setAddBoard] = useState(false);

  return (
    <>
      <AddBoard addBoard={addBoard} setAddBoard={setAddBoard} />
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
        {card.map((card) => (
          <Box
            key={card}
            onClick={() => {
              nav('/dashboard/board');
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
              <Avatar
                src={`https://avatars.dicebear.com/api/initials/${card}.svg`}
                radius="40px"
                size="80px"
              />
              <Text>{card}</Text>
            </Group>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
