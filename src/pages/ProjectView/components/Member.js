/* eslint-disable no-unused-vars */
import { Avatar, Group, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { projectApi } from '../../../api';

export const Member = ({ activeOrg }) => {
  const [members, setMembers] = useState([]);
  const [lead, setLead] = useState([]);

  useEffect(() => {
    const queryparams = new URLSearchParams(window.location.search);
    const payload = queryparams.get('projectId');
    projectApi.getMembers({ projectId: payload }).then((response) => {
      if (response.status === 200) {
        console.log(response.data.data);
        setLead(response.data.data.lead);
        setMembers(response.data.data.members);
      }
    });
  }, [activeOrg]);

  return (
    <>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr key={lead}>
            <td>
              <Group>
                <Avatar src={lead.image} alt="it's me" radius="xl" />
                <>{lead.fullName}</>
              </Group>
            </td>
            <td>{lead.email}</td>
            <td>Lead</td>
          </tr>
          {members.map((member) => (
            <tr key={member}>
              <td>
                <Group>
                  <Avatar src={member.image} alt="it's me" radius="xl" />
                  <>{member.fullName}</>
                </Group>
              </td>
              <td>{member.email}</td>
              <td>Lead</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
