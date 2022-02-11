import { Button, Group, TextInput, Container, Select } from '@mantine/core';

export default function Orgsettings() {
  return (
    <Container size="xs" padding="xs">
      <Group direction="column" grow style={{ marginTop: '20px' }}>
        <TextInput
          required
          placeholder="Organization Name"
          radius="md"
          size="md"
        />
        <Select
          placeholder="Usage"
          radius="md"
          size="md"
          clearable
          data={['Personal', 'Professional', 'Event Management', 'Others']}
        />
      </Group>
      <Button color="teal" style={{ marginTop: '20px' }}>
        Update Changes
      </Button>
    </Container>
  );
}
