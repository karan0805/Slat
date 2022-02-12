import { Button, TextInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function Invite2Org({ setInviteOpen }) {
  const form = useForm({
    initialValues: {
      name: '',
      role: '',
      email: '',
      number: '',
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
              label="Role"
              placeholder="Product Developer"
              {...form.getInputProps('role')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              required
              label="Email Address"
              placeholder="abc@mail.com"
              {...form.getInputProps('email')}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Number"
              placeholder="1234567890"
              {...form.getInputProps('number')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Button type="">Update</Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button color="red" type="">
              Reset my Password
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}
