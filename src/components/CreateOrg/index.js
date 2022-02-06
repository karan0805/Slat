import { Button, Group, Select, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { orgApi } from '../../api';

// eslint-disable-next-line react/prop-types
export default function CreateOrg({ setAddOrg }) {
  const [org, setOrg] = useState('');
  const [orgType, setOrgType] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    orgApi.addOrg(org).then((response) => {
      console.log(response.data.data.user);
    });
    setAddOrg(false);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Group direction="column" grow>
          <TextInput
            placeholder="Organization Name"
            label="Organization Name"
            radius="md"
            onChange={(e) => setOrg(e.target.value)}
            value={org}
            required
          />
          <Select
            label="Organization Type"
            placeholder="Pick one"
            value={orgType}
            onChange={setOrgType}
            data={[
              { value: 'public', label: 'Public' },
              { value: 'private', label: 'Private Workspace' },
            ]}
          />
          <Button type="submit">Create </Button>
        </Group>
      </form>
    </>
  );
}
