/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { orgApi } from '../../api';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/UserSlice';

// eslint-disable-next-line react/prop-types
export default function CreateOrg({ setAddOrg }) {
  const [org, setOrg] = useState('');
  // const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    orgApi.addOrg(org).then((res) => {
      console.log(res.data);
      // dispatch(
      //   login({
      //     userdata: res.data.user,
      //     token: ,
      //     loggedIn: true,
      //   }),
      // );
    });
    setAddOrg(false);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="name"
          onChange={(e) => setOrg(e.target.value)}
          value={org}
          placeholder="Organization Name"
          required
        />
        <Button type="submit">Create Org</Button>
      </form>
    </>
  );
}
