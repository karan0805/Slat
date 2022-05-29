import {
  Avatar,
  Badge,
  Button,
  Divider,
  Group,
  Modal,
  Select,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  AiFillInfoCircle,
  AiFillRightCircle,
  AiOutlineClockCircle,
  AiOutlineSend,
  AiOutlineUser,
} from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { BsLightningCharge } from 'react-icons/bs';
import { BiCommentDetail, BiTrash } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { ticketApi } from '../../api';
import { selectUser } from '../../redux/slices/UserSlice';

const TicketDetails = ({ showDetails, setShowDetails, item, boardDetails }) => {
  const user = useSelector(selectUser);
  const [comment, setComment] = useState('');
  const memberList = [];
  const [member, setMember] = useState();
  const [call, setCall] = useState(false);

  useEffect(() => {
    ticketApi.getComments({ ticketId: item._id }).then((res) => {
      item.comments = res.data.data;
      setCall(false);
    });
  }, [call]);

  memberList.push({
    value: boardDetails?.project?.lead._id,
    label: boardDetails?.project?.lead.fullName,
  });

  for (let i = 0; i < boardDetails?.project?.members.length; i++) {
    memberList.push({
      value: boardDetails?.project?.members[i]?._id,
      label: boardDetails?.project?.members[i]?.fullName,
    });
  }

  for (let j = 0; j < boardDetails?.project?.maintainers.length; j++) {
    memberList.push({
      value: boardDetails?.project?.maintainers[j]._id,
      label: boardDetails?.project?.maintainers[j].fullName,
    });
  }

  const submitHandler = () => {
    if (comment.trim() === '') {
      return toast.error('Please enter a comment');
    }
    ticketApi
      .addComment({
        ticketId: item._id,
        comment,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Comment added');
          setComment('');
          setCall(true);
        }
      });
  };

  const deleteTicket = () => {
    ticketApi
      .deleteTicket({
        ticketId: item._id,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Ticket deleted');
          item.isDeleted = true;
          setShowDetails(false);
        }
      });
  };

  const statusBadge = (status) => {
    if (status === 'open') {
      return (
        <Badge color="red" size="md">
          Not Started
        </Badge>
      );
    } else if (status === 'in-progress') {
      return (
        <Badge color="green" size="md">
          In Progress
        </Badge>
      );
    } else {
      return (
        <Badge color="blue" size="md">
          Completed
        </Badge>
      );
    }
  };

  return (
    <>
      <Modal
        centered
        opened={showDetails}
        onClose={() => setShowDetails(false)}
        overlayColor="#7f7f7f"
        overlayOpacity={0.25}
        size="xl"
        radius={'md'}
        zIndex={10}
        padding={'50px'}
        overflow={'inside'}
      >
        <Title size="lg">{item.title}</Title>
        <br />
        <Text color="dimmed" size="md">
          {item.description}
        </Text>
        <br />
        <Group direction="column" grow>
          <Group>
            <Group>
              <AiOutlineUser color="#999" size={20} />
              <Text color="dimmed" size="md" inline="true">
                Assignee:
              </Text>
            </Group>
            <Select
              placeholder="Pick One"
              data={memberList}
              value={member}
              onChange={setMember}
              size="xs"
              required
            />
          </Group>
          <Group>
            <Group>
              <AiFillInfoCircle color="#999" size={20} />
              <Text color="dimmed" size="md" inline="true">
                Status:
              </Text>
            </Group>
            <Text size="sm">{statusBadge(item.status)}</Text>
          </Group>
          <Group>
            <Group>
              <AiFillRightCircle color="#999" size={20} />
              <Text color="dimmed" size="md" inline="true">
                Priority:
              </Text>
            </Group>
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
          </Group>
          <Group>
            <Group>
              <BsLightningCharge color="#999" size={20} />
              <Text color="dimmed" size="md" inline="true">
                Skills:
              </Text>
            </Group>
            {item.skills.map((skill) => (
              <Badge key={skill} color="teal" size="lg" variant="dot">
                {skill}
              </Badge>
            ))}
          </Group>
          <Group>
            <Group>
              <MdDateRange color="#999" size={20} />
              <Text color="dimmed" size="md" inline="true">
                Due Date:
              </Text>
            </Group>
            <Text size="sm">
              {moment(item.dueDate).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          </Group>
          <Group>
            <Group>
              <AiOutlineClockCircle color="#999" size={20} />
              <Text color="dimmed" size="md" inline="true">
                Date Created:
              </Text>
            </Group>
            <Text size="sm">
              {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          </Group>
          <Group>
            <Button
              color="red"
              size="xs"
              leftIcon={<BiTrash size={15} />}
              onClick={deleteTicket}
            >
              Delete
            </Button>
          </Group>
        </Group>

        <Divider my="sm" />
        <br />
        <Group>
          <BiCommentDetail color="#999" size={20} />
          <Text color="dimmed" size="lg" inline="true">
            Comments
          </Text>
        </Group>
        <br />
        <Group spacing={20}>
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
            style={{ width: '450px' }}
          />
          <Button onClick={submitHandler}>
            <AiOutlineSend />
          </Button>
        </Group>
        <Space h="sm" />
        {item.comments.length > 0 &&
          item.comments.map((comment) => (
            <Group
              mt={10}
              mb={10}
              key={comment?._id}
              direction={'column'}
              spacing="0"
            >
              <Group>
                <Avatar
                  radius="xl"
                  size="sm"
                  src={`https://avatars.dicebear.com/api/initials/${comment?.user_id?.fullName}.svg`}
                />
                <Text size="md" weight={700} color="#333">
                  {comment?.user_id?.fullName}
                </Text>
                <Text size="sm" color="#999">
                  {moment(comment?.createdAt).fromNow()}
                </Text>
              </Group>
              <Text size="md" weight={300}>
                {comment?.text}
              </Text>
            </Group>
          ))}
        {item.comments.length === 0 && (
          <Text size="md" color={'dimmed'} style={{ textAlign: 'center' }}>
            <Space h="md" />
            No Comments to show. Add a comment to see it here.
          </Text>
        )}
      </Modal>
    </>
  );
};

export default TicketDetails;
