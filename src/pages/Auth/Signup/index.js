import { Button, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api';

import logo from '../../../assets/images/logo.svg';
import Illustration from '../Illustration';
import './Signup.css';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');

  const nav = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    userApi.signupUser(fname, email, pwd).then(
      (response) => {
        if (response.data.status == 200) {
          toast.success('Successfully Registered to Slat');
          nav('/auth/login');
        }
      },
      (err) => {
        const errmsg = err.response.data.message;
        toast.error(errmsg);
      },
    );
  };
  const goHome = () => {
    nav('/');
  };

  return (
    <>
      <div className="signup">
        <div className="left">
          <div className="logo" onClick={goHome}>
            <img src={logo} width="40px" /> <h1>Slat</h1>
          </div>

          <Group position="center" direction="column">
            <h2>Create An Account</h2>
            <TextInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              placeholder="Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <TextInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              placeholder="mail@website.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email"
              required
            />
            <PasswordInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              autoComplete="new-password"
              placeholder="Min. 8 character"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <PasswordInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              autoComplete="new-password"
              placeholder="Min. 8 character"
              value={cpwd}
              onChange={(e) => setCpwd(e.target.value)}
              required
            />
            <Button
              style={{
                width: 425,
                height: 50,
                fontWeight: 600,
                fontSize: '16px',
                backgroundColor: '#FFDE59',
                color: 'black',
              }}
              radius="xl"
              onClick={submitHandler}
            >
              Submit
            </Button>
            <Text>
              Already have an account?
              <Link to="/auth/login" className="lgn">
                <span> Sign In</span>
              </Link>
            </Text>
          </Group>
        </div>
        <div className="right">
          <Illustration />
        </div>
      </div>
    </>
  );
};

export default Signup;
