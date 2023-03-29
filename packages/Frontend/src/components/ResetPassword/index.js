import { Button, Group, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import toast from 'react-hot-toast';
import { userApi } from '../../api';

const ResetPassword = ({ setResetOpen }) => {
  const form = useForm({
    initialValues: {
      oldpassword: '',
      newpassword: '',
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          const payload = {
            oldpassword: values.oldpassword,
            newpassword: values.newpassword,
          };
          userApi.resetPassword(payload).then(
            (response) => {
              if (response.status === 200) {
                toast.success('password updated');
                setResetOpen(false);
              }
            },
            (error) => {
              toast.error(error.response.data.message);
            },
          );
        })}
      >
        <Group direction="column" grow="true">
          <PasswordInput
            placeholder="Old Password"
            label="Old Password"
            radius="md"
            {...form.getInputProps('oldpassword')}
            required
          />
          <PasswordInput
            placeholder="New Password"
            label="New Password"
            radius="md"
            {...form.getInputProps('newpassword')}
            required
          />

          <Button type="submit">Reset</Button>
        </Group>
      </form>
    </>
  );
};

export default ResetPassword;
