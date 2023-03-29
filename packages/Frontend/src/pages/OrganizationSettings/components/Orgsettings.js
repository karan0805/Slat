/* eslint-disable react/prop-types */
import { Button, Container, Group, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { orgApi, userApi } from '../../../api';
import { switchOrg } from '../../../redux/slices/OrgSlice';
import { update } from '../../../redux/slices/UserSlice';

export default function Orgsettings({ activeOrg, orgDetails }) {
  const dispatch = useDispatch();
  const [orgName, setOrgName] = useState(activeOrg.orgName);
  const [orgDesc, setOrgDesc] = useState(orgDetails.orgDesc);

  const submitHandler = () => {
    orgApi.orgSettings(activeOrg, orgName, orgDesc).then(
      (response) => {
        if (response.data.status == 200) {
          dispatch(switchOrg(response.data.data));
          toast.success('Successfuly Updated');
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
        toast.error(err.response.data.message);
      },
    );
  };

  return (
    <Container size="xs" padding="xs">
      <Group direction="column" grow style={{ marginTop: '20px' }}>
        <TextInput
          required
          placeholder="Organization Name"
          radius="md"
          size="md"
          value={orgName}
          onChange={(event) => setOrgName(event.currentTarget.value)}
        />
        <Select
          radius="md"
          size="md"
          data={['Personal', 'Professional', 'Event Management', 'Others']}
          value={orgDesc}
          onChange={setOrgDesc}
        />
      </Group>
      <Button
        color="teal"
        style={{ marginTop: '20px' }}
        onClick={submitHandler}
      >
        Update Changes
      </Button>
    </Container>
  );
}
