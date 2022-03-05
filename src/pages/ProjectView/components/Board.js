import React from 'react';
import { SimpleGrid, Box, Group, ThemeIcon, Text, Avatar } from '@mantine/core';
import { BiPlus } from 'react-icons/bi';

export const Board = () => {
  return (
    <>
      <SimpleGrid cols={4}>
        <Box
          sx={() => ({
            display: 'block',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '5px',
            fontWeight: '500',

            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          })}
        >
          <Group>
            <ThemeIcon
              variant="light"
              size="lg"
              color="pink"
              style={{ border: '1px dashed black' }}
            >
              <BiPlus />
            </ThemeIcon>
            <Text>Create Project</Text>
          </Group>
        </Box>

        <Box
          sx={() => ({
            display: 'block',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '5px',
            fontWeight: '500',

            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          })}
        >
          <Group>
            <Avatar radius="md" size="32px" />
            <Text>YO</Text>
          </Group>
        </Box>
      </SimpleGrid>
    </>
  );
};
