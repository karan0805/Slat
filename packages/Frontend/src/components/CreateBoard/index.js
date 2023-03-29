import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { projectApi } from '../../api';

const CreateBoard = ({ addBoard, setAddBoard, projectId }) => {
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      boardName,
      boardDescription,
      projectId,
    };

    projectApi.addBoard(payload).then(
      (res) => {
        if (res.status === 200) {
          console.log(res);
          toast.success('Board added successfully');
          setAddBoard(false);
        }
      },
      (err) => {
        toast.error(err.response.data.message);
      },
    );
  };

  return (
    <>
      <Modal
        centered
        opened={addBoard}
        onClose={() => setAddBoard(false)}
        title="Create New Board"
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
          <Group grow direction="column">
            <TextInput
              placeholder="Board Name"
              label="Board Name"
              radius="md"
              onChange={(e) => setBoardName(e.target.value)}
              value={boardName}
              required
            />
            <Textarea
              placeholder="Board Description"
              label="Board Description"
              radius="md"
              onChange={(e) => setBoardDescription(e.target.value)}
              value={boardDescription}
              required
            />
            <Button type="Submit">Add</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default CreateBoard;
