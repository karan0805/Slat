import { Button, Modal, TextInput } from '@mantine/core';
import React, { useState } from 'react';

const AddBoard = ({ addBoard, setAddBoard }) => {
  const [boardName, setBoardName] = useState('');

  const handleSubmit = () => {
    alert('Success!');
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
          <TextInput
            placeholder="Board Name"
            label="Board Name"
            radius="md"
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
            required
          />
          <Button type="Submit">Add</Button>
        </form>
      </Modal>
    </>
  );
};

export default AddBoard;
