import React, { useState } from 'react';
import { Button, Group, Textarea, TextInput, Modal } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const CreateProject = ({ addProject, setAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [endDate, setEndDate] = useState();

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
        <form>
          <Group direction="column" grow>
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
            <DatePicker value={endDate} onChange={setEndDate} />;
            <Button type="submit">Create </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default CreateProject;
