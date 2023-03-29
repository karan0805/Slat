import { Badge, Group, Card, SimpleGrid, Text } from '@mantine/core';
import React from 'react';

export const Overview = () => {
  return (
    <SimpleGrid cols={1}>
      <Text size="lg">Recent</Text>
      <Card shadow="sm" padding="lg">
        <Group position="apart" style={{ marginBottom: 5 }}>
          <Text weight={500}>Change Slat Icon</Text>
          <Badge color="pink" variant="light">
            FrontEnd
          </Badge>
        </Group>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          Search for new icon on splash and replace it with the original
        </Text>
      </Card>
      <Card shadow="sm" padding="lg">
        <Group position="apart" style={{ marginBottom: 5 }}>
          <Text weight={500}>Create API </Text>
          <Badge color="pink" variant="light">
            Backend
          </Badge>
        </Group>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          Create API for the New developed FrontEnd.
        </Text>
      </Card>
      <Card shadow="sm" padding="lg">
        <Group position="apart" style={{ marginBottom: 5 }}>
          <Text weight={500}>Create API </Text>
          <Badge color="pink" variant="light">
            Backend
          </Badge>
        </Group>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          Create API for the New developed FrontEnd.
        </Text>
      </Card>
    </SimpleGrid>
  );
};
