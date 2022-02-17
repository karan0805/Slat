import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { orgApi } from '../../api';

const Invite2Org = ({ setInviteOpen, activeOrg, user }) => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          const payload = {
            Name: values.name,
            Email: values.email,
            OrgName: activeOrg.orgName,
            InviterName: user.fullName,
            InviteUrl: `${process.env.REACT_APP_FRONTENDURL}/join/Organization/Karan Gandhi Workspace/6206cf9fa157c03c84ac3b17`,
          };
          orgApi.inviteOrg(payload).then((response) => {
            if (response.status === 200) {
              alert('Invite sent');
              setInviteOpen(false);
            }
          });
        })}
      >
        <Group direction="column" grow="true">
          <TextInput
            required
            label="Full Name"
            placeholder="Full Name"
            {...form.getInputProps('name')}
          />
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <Button type="submit">Invite</Button>
        </Group>
      </form>
    </>
  );
};

export default Invite2Org;
