import { Button, Group, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { orgApi, userApi } from '../../api';
import { update } from '../../redux/slices/UserSlice';

export default function CreateOrg({ setAddOrg }) {
  const [org, setOrg] = useState('');
  const [orgType, setOrgType] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    orgApi.addOrg(org, orgType).then(
      (response) => {
        if (response.data.status == 200) {
          toast.success('Successfully Created Organization');
          setAddOrg(false);
        }
        userApi.updatecontext().then(
          (response) => {
            if (response.data.status == 200) {
              dispatch(update(response.data.data));
              console.log('context updated');
            }
          },
          (err) => {
            console.log(err);
          },
        );
      },
      (err) => {
        const errmsg = err.response.data.message;
        toast.error(errmsg);
      },
    );
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
            data={['Personal', 'Professional', 'Event Management', 'Others']}
          />
          <Button type="submit">Create </Button>
        </Group>
      </form>
    </>
  );
}
