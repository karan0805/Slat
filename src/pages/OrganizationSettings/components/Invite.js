import { Button, Container, Group, TextInput } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import React from 'react';

export default function Invite({ activeOrg }) {
  const clipboard = useClipboard({ timeout: 5000 });

  return (
    <Container size="xs" padding="xs">
      <Group style={{ marginTop: '20px' }}>
        <TextInput
          value={
            'http://localhost:3000/join/Organization/' +
            activeOrg.orgName +
            '/' +
            activeOrg._id
          }
          readOnly
          radius="md"
          size="md"
          style={{ width: '350px' }}
        />
        <Button
          variant="outline"
          color={clipboard.copied ? 'teal' : ''}
          onClick={() =>
            clipboard.copy(
              'http://localhost:3000/join/Organization/' +
                activeOrg.orgName +
                '/' +
                activeOrg._id,
            )
          }
        >
          {clipboard.copied ? 'Copied' : 'Copy'}
        </Button>
      </Group>
    </Container>
  );
}
