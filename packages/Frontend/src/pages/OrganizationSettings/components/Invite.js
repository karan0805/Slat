import {
  Button,
  Center,
  Container,
  Group,
  Modal,
  TextInput,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import React, { useState } from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Invite2Org from '../../../components/Invite2Org';
import { selectUser } from '../../../redux/slices/UserSlice';

export default function Invite({ activeOrg }) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const user = useSelector(selectUser);
  const clipboard = useClipboard({ timeout: 5000 });

  return (
    <Container size="xs" padding="xs">
      <Modal
        centered
        opened={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite Member To Organization"
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
        <Invite2Org
          setInviteOpen={setInviteOpen}
          user={user}
          activeOrg={activeOrg}
        />
      </Modal>
      <Group direction="column">
        <Group style={{ marginTop: '20px' }}>
          <TextInput
            value={
              process.env.REACT_APP_FRONTENDURL +
              '/join/Organization/' +
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
                process.env.REACT_APP_FRONTENDURL +
                  '/join/Organization/' +
                  activeOrg.orgName +
                  '/' +
                  activeOrg._id,
              )
            }
          >
            {clipboard.copied ? 'Copied' : 'Copy'}
          </Button>
        </Group>
        <Center>OR</Center>
        <Button
          variant="outline"
          onClick={() => {
            setInviteOpen((prevCheck) => !prevCheck);
          }}
          icon={<RiUserAddLine />}
        >
          Invite via Mail
        </Button>
      </Group>
    </Container>
  );
}
