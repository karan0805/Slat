import {
  Avatar,
  Badge,
  Button,
  Divider,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
  Title,
  Space,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  AiFillRightCircle,
  AiFillClockCircle,
  AiOutlineSend,
  AiFillInfoCircle,
} from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/UserSlice';
import { ticketApi } from '../../api';
import moment from 'moment';

const TicketDetails = ({ showDetails, setShowDetails, item, boardDetails }) => {
  const user = useSelector(selectUser);
  const [comment, setComment] = useState('');
  const memberList = [];
  const [member, setMember] = useState();

  useEffect(() => {
    ticketApi.getComments({ ticketId: item._id }).then((res) => {
      item.comments = res.data.data;
      console.log(res.data.data);
    });
  }, [showDetails, comment]);

  memberList.push({
    value: boardDetails?.project?.lead._id,
    label: boardDetails?.project?.lead.name,
  });

  // for (var i = 0; i < boardDetails.project.members.length; i++) {
  //   memberList.push({
  //     value: boardDetails.project.members[i]._id,
  //     label: boardDetails.project.members[i].name,
  //   });
  // }

  // for (var j = 0; i < boardDetails.project.maintainers.length; j++) {
  //   memberList.push({
  //     value: boardDetails.project.maintainers[j]._id,
  //     label: boardDetails.project.maintainers[j].name,
  //   });
  // }

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
        }
      });
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
              Assigned To
            </Text>
          </Group>
          <Select
            placeholder="Pick One"
            data={memberList}
            value={member}
            onChange={setMember}
            required
          />
        </Group>
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
