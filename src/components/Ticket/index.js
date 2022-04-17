import React from 'react';
import { Card, Group, Text, Badge, Button } from '@mantine/core';

const Ticket = (props) => {
  return (
    <Card shadow="sm">
      <Group position="apart" direction="row">
        <Badge size="s" radius={5} color="red">
          {props.item.priority}
        </Badge>
        <Text weight={600}>{props.item.content}</Text>
        <Group>
          <Button size="xs" variant="light" color="blue">
            Done
          </Button>
          <Button size="xs" variant="light" color="red">
            Remove
          </Button>
        </Group>
      </Group>
    </Card>
  );
};
export default Ticket;
