import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import React from 'react';

export default function Invite2Org({ setInviteOpen }) {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      termsOfService: false,
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(() => {
          setInviteOpen(false);
        })}
      >
        <Group direction="column" grow="true">
          <TextInput
            required
            label="Full Name"
            placeholder="Sanket Mense"
            {...form.getInputProps('name')}
          />
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <Button type="submit">Invite</Button>
        </Group>
      </form>
    </>
  );
}
