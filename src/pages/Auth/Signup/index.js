import { TextInput, PasswordInput, Button } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api';
import logo from '../../../assets/images/logo.svg';
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
          <h2>Create An Account</h2>

          <form>
            <TextInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              placeholder="Name"
              label="Full Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <TextInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              placeholder="mail@website.com"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email"
              required
            />
            <PasswordInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              placeholder="Min. 8 character"
              label="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <PasswordInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              placeholder="Min. 8 character"
              label="Confirm Password"
              value={cpwd}
              onChange={(e) => setCpwd(e.target.value)}
              required
            />
            <Button
              color="teal"
              style={{
                marginTop: '20px',
                width: 425,
                height: 50,
              }}
              radius="xl"
              onClick={submitHandler}
            >
              Sign In
            </Button>
          </form>
          <div>
            Already have an account?
            <Link to="/auth/login" className="lgn">
              <span> Sign In</span>
            </Link>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};

export default Signup;
