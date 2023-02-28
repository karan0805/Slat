/* eslint-disable no-unused-vars */
import {
  Avatar,
  Badge,
  Button,
  Group,
  Select,
  Modal,
  Table,
  Text,
  Card,
  List,
  ListItem,
  ScrollArea,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { orgApi, projectApi } from '../../../api';
import { selectActiveOrg } from '../../../redux/slices/OrgSlice';
import { selectUser } from '../../../redux/slices/UserSlice';

export const Member = () => {
  const link =
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80';
  const [maintainers, setMaintainers] = useState([]);
  const [members, setMembers] = useState([]);
  const [lead, setLead] = useState([]);
  const [orgMembers, setOrgMembers] = useState([]);
  const [member, setMember] = useState();
  const [role, setRole] = useState();
  const [opened, setOpened] = useState(false);
  const [userSkills, setUserSkills] = useState([
    'React',
    'Node',
    'MongoDB',
    'Express',
    'GraphQL',
  ]);
  const [call, setCall] = useState(false);
  const [info, setInfo] = useState({});
  const memberList = [];

  const user = useSelector(selectUser);
  const activeOrg = useSelector(selectActiveOrg);

  useEffect(() => {
    const queryparams = new URLSearchParams(window.location.search);
    const payload = queryparams.get('projectId');
    projectApi.getMembers({ projectId: payload }).then((response) => {
      if (response.status === 200) {
        console.log(response.data.data);
        setLead(response.data.data.lead);
        setMembers(response.data.data.members);
        setMaintainers(response.data.data.maintainers);
        setCall(false);
      }
    });
    orgApi.getMembers(activeOrg).then((response) => {
      if (response.status === 200) {
        setOrgMembers(response.data.data);
        console.log('orgMembers', response.data.data);
      }
    });
  }, [activeOrg, call]);

  for (var i = 0; i < orgMembers.length; i++) {
    if (orgMembers[i]._id !== lead._id) {
      memberList.push({
        value: orgMembers[i]._id,
        label: orgMembers[i].fullName,
      });
    }
  }

  const submitHandler = () => {
    const queryparams = new URLSearchParams(window.location.search);
    const payload = {
      projectId: queryparams.get('projectId'),
      userId: member,
      role: role,
    };
    projectApi.addMember(payload).then(
      (res) => {
        if (res.status === 200) {
          console.log(res);
          toast.success('Successfully Executed');
          setMember('');
          setRole('');
          setCall(true);
        }
      },
      (err) => {
        toast.error(err.response.data.message);
      },
    );
  };

  return (
    <>
      <Modal
        size="sm"
        opened={opened}
        onClose={() => setOpened(false)}
        title="User Info!"
      >
        <Card withBorder p="xl" radius="md">
          <Card.Section
            sx={{
              backgroundImage: `url(${link})`,

              height: 140,
            }}
          />
          <Avatar src={info.image} size={80} radius={80} mx="auto" mt={-30} />
          <Text align="center" size="lg" weight={500} mt="sm">
            {info.name}
          </Text>
          <Text align="center" size="sm" color="dimmed">
            {info.role}
          </Text>
          <br />
          <Group position="center" spacing="xl">
            {info?.skills?.length > 0 &&
              info?.skills?.map((skill) => (
                <Badge key={skill} color="teal" size="lg" variant="dot">
                  {skill}
                </Badge>
              ))}
          </Group>
        </Card>
      </Modal>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr key={lead}>
            <td>
              <Group
                onClick={() => {
                  setOpened(true);
                  setInfo({
                    image: lead.image,
                    name: lead.fullName,
                    role: 'Lead',
                    skills: lead.skills,
                  });
                }}
                spacing="sm"
              >
                <Avatar src={lead.image} alt="it's me" radius={30} size={30} />
                <Text size="sm" weight={500}>
                  {lead.fullName}
                </Text>
              </Group>
            </td>
            <td>
              <Badge color="green">Lead</Badge>
            </td>
            <td>{lead.email}</td>
          </tr>
          {maintainers.map((maintainer) => (
            <tr key={maintainer}>
              <td>
                <Group
                  onClick={() => {
                    setOpened(true);
                    setInfo({
                      image: maintainer.image,
                      name: maintainer.fullName,
                      role: 'Maintainer',
                      skills: maintainer.skills,
                    });
                  }}
                  spacing="sm"
                >
                  <Avatar
                    src={maintainer.image}
                    alt="it's me"
                    radius={30}
                    size={30}
                  />
                  <Text size="sm" weight={500}>
                    {maintainer.fullName}
                  </Text>
                </Group>
              </td>
              <td>
                <Badge color="pink">Maintainer</Badge>
              </td>
              <td>{maintainer.email}</td>
            </tr>
          ))}
          {members.map((member) => (
            <tr key={member}>
              <td>
                <Group
                  onClick={() => {
                    setOpened(true);
                    setInfo({
                      image: member.image,
                      name: member.fullName,
                      role: 'Member',
                      skills: member.skills,
                    });
                  }}
                  spacing="sm"
                >
                  <Avatar
                    src={member.image}
                    alt="it's me"
                    radius={30}
                    size={30}
                  />
                  <Text size="sm" weight={500}>
                    {member.fullName}
                  </Text>
                </Group>
              </td>
              <td>
                <Badge color="blue">Member</Badge>
              </td>
              <td>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />

      {user._id == lead._id && (
        <Table>
          <tbody>
            <tr>
              <td>
                <Select
                  placeholder="Choose Member"
                  data={memberList}
                  value={member}
                  onChange={setMember}
                  required
                />
              </td>
              <td>
                <Select
                  placeholder="Select Role"
                  data={[
                    { value: 'maintainer', label: 'Maintainer' },
                    { value: 'member', label: 'Member' },
                  ]}
                  value={role}
                  onChange={setRole}
                  required
                />
              </td>
              <td>
                <Button type="submit" onClick={submitHandler}>
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
};
