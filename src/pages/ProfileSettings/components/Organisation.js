import { Container, Space, Table, Group } from '@mantine/core';

export default function Organisation({ user }) {
  return (
    <Container>
      <Space h="lg" />
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Organisation</th>
            <th>Type</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {user.org.map((org) => (
            <tr key={org._id}>
              <td>
                <Group>
                  <>{org.orgName}</>
                </Group>
              </td>
              <td>Personal</td>
              <td>Member</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
