import { Button, Center } from '@mantine/core';
import { orgApi, userApi } from '../../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { update } from '../../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { switchOrg } from '../../../redux/slices/OrgSlice';

export default function Manage({ activeOrg }) {
  let dispatch = useDispatch();
  let nav = useNavigate();
  const removeorgHandler = () => {
    console.log(activeOrg);
    orgApi.deleteOrg(activeOrg).then(
      (response) => {
        if (response.data.status == 200) {
          toast.success('Successfuly Deleted');
          nav('/dashboard');
        }
        userApi.updatecontext().then(
          (response) => {
            if (response.data.status == 200) {
              dispatch(update(response.data.data));
              dispatch(switchOrg(response.data.data));
              console.log('context updated');
            }
          },
          (err) => {
            console.log(err);
          },
        );
      },
      (err) => {
        toast.error(err.response.data.message);
      },
    );
  };

  return (
    <Center>
      <Button
        color="red"
        style={{ marginTop: '20px' }}
        onClick={removeorgHandler}
      >
        Remove Organization
      </Button>
    </Center>
  );
}
