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
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { orgApi, projectApi } from '../../../api';
import { selectActiveOrg } from '../../../redux/slices/OrgSlice';

export const Member = () => {
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
  const memberList = [];

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
      }
    });
    orgApi.getMembers(activeOrg).then((response) => {
      if (response.status === 200) {
        setOrgMembers(response.data.data);
      }
    });
  }, [activeOrg]);

  for (var i = 0; i < orgMembers.length; i++) {
    memberList.push({
      value: orgMembers[i]._id,
      label: orgMembers[i].fullName,
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const queryparams = new URLSearchParams(window.location.search);
    const payload = {
      projectId: queryparams.get('projectId'),
      userId: member,
      role: role,
    };
    projectApi.addMember(payload).then((res) => {
      if (res.status === 200) {
        console.log(res);
        toast.success('Member added successfully');
        setMember('');
        setRole('');
      }
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="User Skills!"
      >
        <List type="ordered" withPadding>
          {userSkills.map((skill) => (
            <ListItem key={skill}>{skill}</ListItem>
          ))}
        </List>
      </Modal>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr key={lead}>
            <td>
              <Group
                onClick={() => {
                  setOpened(true);
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
            <td>
              <Text size="sm" color="gray">
                +91 721-865-4389
              </Text>
            </td>
          </tr>
          {maintainers.map((maintainer) => (
            <tr key={maintainer}>
              <td>
                <Group
                  onClick={() => {
                    setOpened(true);
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
              <td>
                <Text size="sm" color="gray">
                  +91 721-865-4389
                </Text>
              </td>
            </tr>
          ))}
          {members.map((member) => (
            <tr key={member}>
              <td>
                <Group
                  onClick={() => {
                    setOpened(true);
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
                <Badge color="blue">Memeber</Badge>
              </td>
              <td>{member.email}</td>
              <td>
                <Text size="sm" color="gray">
                  +91 721-865-4389
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
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
    </>
  );
};
