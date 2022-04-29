/* eslint-disable no-unused-vars */
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Space,
  Text,
  AvatarsGroup,
  Avatar,
} from '@mantine/core';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

const Ticket = (props) => {
  return (
    <Card
      shadow="xl"
      style={{
        marginBottom: '5px',
        width: '300px',
        borderBottom: '3px solid pink',
      }}
    >
      <Group grow direction="column" spacing={0}>
        <Group position="apart" direction="row">
          <Badge color="pink" variant="filled">
            {/* {props.item.priority} */}
            Research
          </Badge>
          <BsThreeDots />
        </Group>
        <Text size="md" weight={500}>
          {/* {props.item.content} */}
          Audit information architecture{' '}
        </Text>
        <Space h="sm" />
        <Text size="sm" color="dimmed" weight={500}>
          Lorem ipsum dolor sit amet, consect fg h etur adipiscing elit.
        </Text>
        <Space h="sm" />
        <AvatarsGroup size={'sm'} limit={2}>
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            component="a"
            href="https://github.com/rtivital"
          />
          <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" />
        </AvatarsGroup>
      </Group>
    </Card>
  );
};
export default Ticket;
