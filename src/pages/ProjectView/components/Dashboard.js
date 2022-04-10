import { Card, Group, SimpleGrid, Text, Badge } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { projectApi } from '../../../api';

export const Dashboard = () => {
  const [project, setProject] = useState('');
  const statusBadge = (status) => {
    if (status === 'In Progress') {
      return <Badge size="lg">{status}</Badge>;
    } else if (status === 'Completed') {
      return (
        <Badge color="green" size="lg">
          {status}
        </Badge>
      );
    } else {
      return (
        <Badge color="red" size="lg">
          {status}
        </Badge>
      );
    }
  };

  useEffect(() => {
    const queryparams = new URLSearchParams(window.location.search);
    const payload = queryparams.get('projectId');
    projectApi.getProject({ projectId: payload }).then((res) => {
      setProject(res.data.data);
    });
  }, []);

  return (
    <>
      <SimpleGrid cols={1}>
        <Card shadow="sm" padding="lg">
          <Group style={{ marginBottom: 5 }}>
            <Text weight={500}>Project Name:</Text>
            <Text weight={500} style={{ lineHeight: 1.5 }}>
              {project?.name}
            </Text>
          </Group>
          <Group style={{ marginBottom: 5 }}>
            <Text weight={500}>Project Description:</Text>
            <Text weight={500} style={{ lineHeight: 1.5 }}>
              {project?.description}
            </Text>
          </Group>
          <Group style={{ marginBottom: 5 }}>
            <Text weight={500}>Project Status:</Text>
            <Text weight={500} style={{ lineHeight: 1.5 }}>
              {project ? statusBadge(project.status) : ''}
            </Text>
          </Group>
          <Group style={{ marginBottom: 5 }}>
            <Text weight={500}>Project Lead:</Text>
            <Text weight={500} style={{ lineHeight: 1.5 }}>
              {project ? project.lead.fullName : ''}
            </Text>
          </Group>
          <Group style={{ marginBottom: 5 }}>
            <Text weight={500}>Number of Boards:</Text>
            <Text weight={500} style={{ lineHeight: 1.5 }}>
              {project ? project.boards?.length : 0}
            </Text>
          </Group>
        </Card>
      </SimpleGrid>
    </>
  );
};
