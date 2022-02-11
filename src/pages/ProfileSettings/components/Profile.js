import { Button, TextInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function Invite2Org({ setInviteOpen }) {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
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
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Full Name"
              placeholder="Sanket Mense"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Role"
              placeholder="Product Developer"
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Email Address"
              placeholder="abc@mail.com"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Button type="submit">Update</Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Number"
              placeholder="1234567890"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Full Name"
              placeholder="Sanket Mense"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
        </Grid>
        <Button type="submit">Update</Button>
      </form>
    </>
  );
}
