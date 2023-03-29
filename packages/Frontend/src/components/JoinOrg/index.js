import {
  Avatar,
  Button,
  Group,
  Modal,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { orgApi, userApi } from '../../api';
import { update } from '../../redux/slices/UserSlice';

const JoinOrg = () => {
  const [opened, setOpened] = useState(true);
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const nav = useNavigate();
  let { orgName, orgId } = useParams();

  const joinHandler = () => {
    if (orgName && orgId) {
      orgApi.joinOrg(orgId).then(
        (response) => {
          if (response.status === 200) {
            toast.success(`Welcome to ${orgName} Organization`);
            setOpened(false);
            nav('/dashboard');
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
        (error) => {
          toast.error(error.response.data.message);
          nav('/dashboard');
        },
      );
    }
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => {
          nav('/dashboard');
          setOpened(false);
        }}
        overlayColor="#7f7f7f"
        overlayOpacity={0.25}
        radius={'md'}
        zIndex={5}
        styles={{
          root: { fontSize: '16px', padding: '0px' },
          inner: {},
          modal: {},
          header: {},
          title: { fontWeight: 'bold' },
          body: {},
        }}
      >
        <Group position="center" direction="column">
          <Avatar
            src={`https://avatars.dicebear.com/api/identicon/${orgName}.svg`}
            alt="org"
          />
          <Title style={{ fontFamily: 'Poppins' }}>{orgName}</Title>
          <Space h="25px" />
          <Text align="center">
            You are invited to the Organization {orgName}. <br />
            To join the Organization, Please type &apos;<i>CONFIRM</i>&apos; and
            click the Join button !
          </Text>
          <TextInput
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="            CONFIRM"
            radius="md"
          />
          <Button onClick={joinHandler} disabled={value !== 'CONFIRM'}>
            Join Organization
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default JoinOrg;
