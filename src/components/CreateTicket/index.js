import {
  Button,
  Modal,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { boardApi } from '../../api';
import { skills } from '../../assets/data/skillsData';

const CreateTicket = ({ addTask, setAddTask, boardDetails }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState();
  const [type, setType] = useState('');
  const [UserSkills, setUserSkills] = useState([]);

  const data = skills;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      skills: UserSkills,
      priority,
      dueDate,
      boardId: boardDetails._id,
    };
    console.log('ticket payload', payload);
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
            label="Choose Type"
            placeholder="Pick One"
            data={[
              { value: 'bug', label: '🐛 Bug' },
              { value: 'feature', label: '🚀 Feature' },
              { value: 'task', label: '📃 Task' },
            ]}
            value={type}
            onChange={setType}
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
          <MultiSelect
            data={data}
            label="Required Skills"
            placeholder="Choose Required Skills"
            onChange={setUserSkills}
            value={UserSkills}
            searchable
            nothingFound="Nothing found"
          />
          <DatePicker
            firstDayOfWeek="sunday"
            placeholder="Due Date"
            label="Due Date"
            value={dueDate}
            radius="md"
            onChange={setDueDate}
            minDate={new Date()}
            required={true}
          />
          <br />
          <Button type="submit">Create </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateTicket;
