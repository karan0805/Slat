import { Space, Table, Avatar, Group } from '@mantine/core';

export default function Members() {
  const elements = [
    { name: 'Karan Gandhi', email: 'karangandhi@gmail.com', role: 'Admin' },
    { name: 'Hitesh', email: 'temp@gmail.com', role: 'Member' },
    { name: 'Sanket', email: 'temp@gmail.com', role: 'Member' },
  ];

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>
        <Group>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${element.name}.svg`}
            alt="it's me"
            radius="xl"
          />
          <>{element.name}</>
        </Group>
      </td>
      <td>{element.email}</td>
      <td>{element.role}</td>
    </tr>
  ));

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
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
