import React from 'react';
import { SimpleGrid, Box, Group, ThemeIcon, Text, Avatar } from '@mantine/core';
import { BiPlus } from 'react-icons/bi';

export const Board = () => {
  const card = ['design', 'development', 'testing', 'qa', 'release'];

  return (
    <>
      <SimpleGrid cols={3}>
        <Box
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
