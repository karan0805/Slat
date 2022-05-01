import {
  Avatar,
  Badge,
  Button,
  Divider,
  Group,
  Modal,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';
import {
  AiFillRightCircle,
  AiFillClockCircle,
  AiOutlineSend,
  AiFillInfoCircle,
} from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/UserSlice';

const TicketDetails = ({ showDetails, setShowDetails, item }) => {
  console.log(item);
  const user = useSelector(selectUser);
  const [comment, setComment] = useState('');

  return (
    <>
      <Modal
        centered
        withcloseButton={false}
        opened={showDetails}
        onClose={() => setShowDetails(false)}
        overlayColor="#7f7f7f"
        overlayOpacity={0.25}
        size="xl"
        radius={'md'}
        zIndex={5}
        // styles={{
        //   root: { fontSize: '16px', padding: '0px' },
        //   inner: {},
        //   modal: {},
        //   header: {},
        //   title: { fontWeight: 'bold' },
        //   body: {},
        // }}
        padding={'50px'}
        overflow={'inside'}
      >
        <Title>{item.title}</Title>
        <br />
        <Text color="dimmed" size="sm">
          {item.description}
        </Text>
        <br />
        <Group spacing={75}>
          <Group>
            <AiFillClockCircle color="#999" size={20} />
            <Text color="dimmed" size="lg" inline="true">
              Due Date
            </Text>
          </Group>
          <Text>{item.dueDate.split('T')[0]}</Text>
        </Group>
        <br />
        <Group spacing={75}>
          <Group>
            <AiFillRightCircle color="#999" size={20} />
            <Text color="dimmed" size="lg" inline="true">
              Priority
            </Text>
          </Group>
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
        <br />
        <Group spacing={75}>
          <Group>
            <AiFillInfoCircle color="#999" size={20} />
            <Text color="dimmed" size="lg" inline="true">
              Status
            </Text>
          </Group>
          <Text>{item.status}</Text>
        </Group>
        <br />
        <Divider my="sm" />
        <br />
        <Group>
          <BiCommentDetail color="#999" size={20} />
          <Text color="dimmed" size="lg" inline="true">
            Comments
          </Text>
        </Group>
        <br />
        <Group spacing={50}>
          <Avatar
            radius="xl"
            size="sm"
            src={`https://avatars.dicebear.com/api/initials/${user.fullName}.svg`}
          />
          <TextInput
            placeholder="Add a Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            radius="md"
            required
          />
          <Button>
            <AiOutlineSend />
          </Button>
        </Group>
        <br />
        <Group mb={12}>
          <Avatar
            radius="xl"
            size="sm"
            src={`https://avatars.dicebear.com/api/initials/${user.fullName}.svg`}
          />
          <Text size="lg" weight={500} color="#333">
            {user.fullName}
          </Text>
        </Group>
        <Text size="md">Hello World!</Text>
        {/* ------------------------------- */}
        <Group mt={10} mb={10}>
          <Avatar
            radius="xl"
            size="sm"
            src={`https://avatars.dicebear.com/api/initials/${user.fullName}.svg`}
          />

          <Text size="lg" weight={500} color="#333">
            {user.fullName}
          </Text>
        </Group>
        <Text size="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Modal>
    </>
  );
};

export default TicketDetails;
