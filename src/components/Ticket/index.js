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
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import TicketDetails from '../TicketDetails';

const Ticket = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <TicketDetails
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        item={item}
      />
      <Card
        shadow="xl"
        style={{
          marginBottom: '5px',
          width: '300px',
          borderBottom: `3px solid ${
            item.priority === 'high'
              ? '#fa5252'
              : item.priority === 'medium'
              ? '#fd7e14'
              : '#228be6'
          }`,
        }}
        onClick={() => setShowDetails(true)}
      >
        <Group grow direction="column" spacing={0}>
          <Group position="apart" direction="row">
            <Text size="md" weight={500}>
              {item.title}
            </Text>

            <BsThreeDots />
          </Group>

          <Space h="sm" />
          <Text size="sm" color="dimmed" weight={500}>
            {item.description}
          </Text>
          <Space h="sm" />
          <Group position="apart" direction="row">
            <AvatarsGroup size={'sm'} limit={2}>
              <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                component="a"
                href="https://github.com/rtivital"
              />
              <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" />
            </AvatarsGroup>
            {item.priority === 'high' && (
              <Badge color="red" style={{ width: 120 }}>
                High Priority
              </Badge>
            )}
            {item.priority === 'medium' && (
              <Badge color="orange" style={{ width: 150 }}>
                Medium Priority
              </Badge>
            )}
            {item.priority === 'low' && (
              <Badge color="blue" style={{ width: 120 }}>
                Low Priority
              </Badge>
            )}
          </Group>
        </Group>
      </Card>
    </>
  );
};
export default Ticket;
