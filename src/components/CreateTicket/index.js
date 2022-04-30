import { Button, Modal, Select, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { boardApi } from '../../api';

const CreateTicket = ({ addTask, setAddTask, boardDetails }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      priority,
      dueDate,
      boardId: boardDetails._id,
    };
    boardApi.addTicket(payload).then(
      (res) => {
        if (res.status === 200) {
          console.log(res);
          toast.success('Ticket added successfully');
          setAddTask(false);
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
        opened={addTask}
        onClose={() => setAddTask(false)}
        title="Create New Task"
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
            placeholder="Title"
            label="Title"
            radius="md"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <Textarea
            placeholder="Description"
            label="Description"
            radius="md"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          <Select
            label="Choose Priority"
            placeholder="Pick One"
            data={[
              { value: 'low', label: 'Low Priority' },
              { value: 'medium', label: 'Medium Priority' },
              { value: 'high', label: 'High Priority' },
            ]}
            value={priority}
            onChange={setPriority}
            required
          />
          <DatePicker
            firstDayOfWeek="sunday"
            placeholder="Due Date"
            label="Due Date"
            value={dueDate}
            radius="md"
            onChange={setDueDate}
            minDate={new Date()}
            required
          />
          <br />
          <Button type="submit">Create </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateTicket;
