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
import { BiCommentDetail } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import TicketDetails from '../TicketDetails';

const Ticket = ({ item, boardDetails, isAdmin }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <TicketDetails
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        boardDetails={boardDetails}
        item={item}
        isAdmin={isAdmin}
      />
      {item.isDeleted !== true && (
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
              {item.priority === 'high' && (
                <Badge color="red" style={{ width: 110 }}>
                  High Priority
                </Badge>
              )}
              {item.priority === 'medium' && (
                <Badge color="orange" style={{ width: 130 }}>
                  Medium Priority
                </Badge>
              )}
              {item.priority === 'low' && (
                <Badge color="blue" style={{ width: 110 }}>
                  Low Priority
                </Badge>
              )}

              <BsThreeDots />
            </Group>

            <Space h="10px" />
            <Text size="md" weight={600}>
              {item.title}
            </Text>
            <Space h="3px" />
            <Text size="xs" color="dimmed" weight={500}>
              {item.description}
            </Text>

            <Space h="sm" />
            <Group position="apart" direction="row">
              <AvatarsGroup size={'sm'} limit={2}>
                {item?.assignees.map((assignee) => {
                  <Avatar
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                    component="a"
                    href="https://github.com/karan0805"
                  />;
                })}
              </AvatarsGroup>
              {item?.comments.length > 0 && (
                <Text size={'sm'} style={{ color: '#999' }}>
                  {item?.comments.length}
                  <BiCommentDetail
                    color="#999"
                    size={'15px'}
                    style={{ marginLeft: '3px' }}
                  />
                </Text>
              )}
            </Group>
          </Group>
        </Card>
      )}
    </>
  );
};
export default Ticket;
