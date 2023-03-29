import { Button, Modal, Space, Text } from '@mantine/core';
import React from 'react';
import toast from 'react-hot-toast';
import { boardApi } from '../../api';

const AutoAssignTicket = ({ autoAssign, setAutoAssign, boardDetails }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    boardApi.autoAssign({ boardId: boardDetails._id }).then((res) => {
      if (res.status === 200) {
        toast.success('Ticket auto assigned successfully');
        setAutoAssign(false);
      } else {
        toast.error('Auto Assign Failed');
      }
    });
  };
  return (
    <>
      <Modal
        centered
        opened={autoAssign}
        onClose={() => setAutoAssign(false)}
        title="Auto Assign"
        overlayColor="#7f7f7f"
        overlayOpacity={0.25}
        radius={'md'}
        zIndex={5}
        styles={{
          root: { fontSize: '16px', padding: '0px' },
          inner: {},
          modal: {},
          header: {},
          title: { fontWeight: 'bold' },
          body: {},
        }}
      >
        <form onSubmit={handleSubmit}>
          <Text color={'dimmed'}>
            This will Auto Assign All the Unassigned Tickets with the user
            matching the ticket Criteria. Please Click Run Auto-Assignment to
            Continue.
          </Text>
          <Space h="md" />
          <Button type="submit" color="red">
            Run Auto Assignment{' '}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AutoAssignTicket;
