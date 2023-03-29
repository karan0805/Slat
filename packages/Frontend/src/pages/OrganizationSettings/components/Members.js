import { Avatar, Group, Space, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import { orgApi } from '../../../api';

export default function Members({ activeOrg }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    orgApi.getMembers(activeOrg).then((response) => {
      if (response.status === 200) {
        setMembers(response.data.data);
      }
    });
  }, [activeOrg]);

  return (
    <>
      <Space h="lg" />
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>
                <Group>
                  <Avatar src={member.image} alt="it's me" radius="xl" />
                  <>{member.fullName}</>
                </Group>
              </td>
              <td>{member.email}</td>
              <td>
                {activeOrg.owner.includes(member._id) ? 'Admin' : 'Member'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
