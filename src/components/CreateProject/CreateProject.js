import React, { useState } from 'react';
import { Button, Textarea, TextInput, Modal } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { projectApi, userApi } from '../../api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { update } from '../../redux/slices/UserSlice';
import { switchOrg } from '../../redux/slices/OrgSlice';

const CreateProject = ({ addProject, setAddProject, activeOrg }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [endDate, setEndDate] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      projectName,
      projectDescription,
      endDate,
      orgId: activeOrg._id,
    };
    projectApi.addProject(payload).then(
      (res) => {
        if (res.status === 200) {
          console.log(res);
          toast.success('Project added successfully');
          setAddProject(false);
        }
        userApi.updatecontext({ activeOrg }).then(
          (response) => {
            if (response.data.status == 200) {
              dispatch(update(response.data.data));
              dispatch(switchOrg(response.data.data));
              console.log('context updated');
            }
          },
          (err) => {
            console.log(err);
          },
        );
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
        opened={addProject}
        onClose={() => setAddProject(false)}
        title="Create New Project"
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
            placeholder="Project Name"
            label="Projet Name"
            radius="md"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            required
          />
          <Textarea
            placeholder="Project Description"
            label="Project Description"
            radius="md"
            onChange={(e) => setProjectDescription(e.target.value)}
            value={projectDescription}
            required
          />
          <DatePicker
            firstDayOfWeek="sunday"
            placeholder="End Date"
            label="End Date"
            value={endDate}
            radius="md"
            onChange={setEndDate}
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

export default CreateProject;