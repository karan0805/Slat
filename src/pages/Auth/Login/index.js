import { Button, PasswordInput, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api';
import logo from '../../../assets/images/logo.svg';
import { orgLogin } from '../../../redux/slices/OrgSlice';
import { login } from '../../../redux/slices/UserSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const nav = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    userApi.loginUser(email, pwd).then(
      (response) => {
        if (response.data.status == 200) {
          localStorage.setItem('access_token', response.data.data.token);
          dispatch(login(response.data.data));
          dispatch(orgLogin(response.data.data));
          toast.success('Successfully logged in..');
          window.location.href = '/dashboard';
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
      <div className="login">
        <div className="left">
          <div className="logo" onClick={goHome}>
            <img src={logo} width="40px" /> <h1>Slat</h1>
          </div>
          <h2>Welcome Back</h2>

          <form>
            <TextInput
              style={{ width: 425 }}
              size="lg"
              radius="xl"
              placeholder="mail@website.com"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></TextInput>
            <br />
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
            <br />
            <Link to="/auth/forgot-password" className="fgp">
              Forgot Password?
            </Link>
            <br />
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
            <br />
            Don&apos;t have an account?
            <Link to="/auth/signup" className="sgp">
              <span> Sign Up</span>
            </Link>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};

export default Login;
