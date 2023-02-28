import {
  Button,
  SimpleGrid,
  TextInput,
  Modal,
  MultiSelect,
} from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userApi } from '../../../api';
import ResetPassword from '../../../components/ResetPassword';
import { update } from '../../../redux/slices/UserSlice';
import { skills } from '../../../assets/data/skillsData';

export default function Profile({ user }) {
  const dispatch = useDispatch();
  const [resetopen, setResetOpen] = useState(false);
  const [UserFullName, setUserFullName] = useState(user.fullName);
  const [UserName, setUserName] = useState(user.username);
  const [UserNumber, setUserNumber] = useState('9168336170');
  const [UserEmail, setUserEmail] = useState(user.email);
  const [UserSkills, setUserSkills] = useState(user.skills);

  const data = skills;

  const submitHandler = () => {
    userApi
      .profileSettings({
        fullName: UserFullName,
        username: UserName,
        email: UserEmail,
        phone: UserNumber,
        skills: UserSkills,
      })
      .then(
        (response) => {
          if (response.data.status == 200) {
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
    <>
      <Modal
        centered
        opened={resetopen}
        radius={'md'}
        zIndex={9999}
        title="Reset Password"
        onClose={() => setResetOpen(false)}
      >
        <ResetPassword setResetOpen={setResetOpen} />
      </Modal>

      <SimpleGrid cols={2} style={{ marginTop: '20px' }}>
        <TextInput
          required
          label="Full Name"
          placeholder="Full Name"
          radius="md"
          size="md"
          value={UserFullName}
          onChange={(event) => setUserFullName(event.currentTarget.value)}
        />
        <TextInput
          required
          label="Username"
          placeholder="UserName"
          radius="md"
          size="md"
          value={UserName}
          onChange={(event) => setUserName(event.currentTarget.value)}
        />
        <TextInput
          required
          label="Email"
          placeholder="abc@gmail.com"
          radius="md"
          size="md"
          value={UserEmail}
          onChange={(event) => setUserEmail(event.currentTarget.value)}
        />
        <TextInput
          label="Number"
          placeholder="1234567890"
          radius="md"
          size="md"
          value={UserNumber}
          onChange={(event) => setUserNumber(event.currentTarget.value)}
        />
        <TextInput
          label="Skills"
          radius="md"
          size="md"
          value={UserSkills}
          disabled
        />
        <MultiSelect
          data={data}
          label="Update Skills"
          placeholder="Update your skills"
          onChange={setUserSkills}
          value={UserSkills}
          searchable
          nothingFound="Nothing found"
        />

        <Button
          color="teal"
          style={{ marginTop: '20px' }}
          onClick={submitHandler}
        >
          Update Changes
        </Button>
        <Button
          color="red"
          style={{ marginTop: '20px' }}
          onClick={() => setResetOpen(true)}
        >
          Reset My Password
        </Button>
      </SimpleGrid>
    </>
  );
}
