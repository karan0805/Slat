import { Modal, PasswordInput, Button } from '@mantine/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api';
import logo from '../../../assets/images/logo.svg';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newpasswd, setNewpass] = useState('');
  const [confirmnewpasswd, setConfirmnewpass] = useState('');
  const [opened, setOpened] = useState(false);

  const nav = useNavigate();
  const queryparams = new URLSearchParams(window.location.search);
  const token = queryparams.get('token');

  useEffect(() => {
    if (window.location.pathname == '/auth/reset-password') {
      setOpened(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    userApi.resetUser({ newpasswd, token }).then(
      (response) => {
        if (response.status === 200) {
          toast.success('Successfully Reset Password');
          nav('/auth/login');
        }
      },
      (err) => {
        const errmsg = err.response.data.message;
        toast.error(errmsg);
      },
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    userApi.forgotUser(email).then(
      () => {
        toast.success('Reset Email Sent Sucessfully');
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
      <Modal
        centered
        closeOnClickOutside={false}
        opened={opened}
        onClose={() => {
          nav('/auth/login');
        }}
        title="Password Reset"
        overlayColor="#7f7f7f"
        overlayOpacity={0.5}
        radius={'md'}
        zIndex={5}
        styles={{
          root: { fontSize: '16px', padding: '0px' },
          inner: {},
          modal: {},
          header: {},
          title: { fontWeight: 'bold' },
          body: {},
        }}
      >
        <form onSubmit={handleSubmit}>
          <PasswordInput
            placeholder="New Password"
            label="New Password"
            radius="md"
            onChange={(e) => setNewpass(e.target.value)}
            value={newpasswd}
            required
          />
          <PasswordInput
            placeholder="Confirm New Password"
            label="Confirm New Password"
            radius="md"
            onChange={(e) => setConfirmnewpass(e.target.value)}
            value={confirmnewpasswd}
            required
          />

          <br />
          <Button type="submit">Create </Button>
        </form>
      </Modal>
      <div className="forgot">
        <div className="left">
          <div className="logo" onClick={goHome}>
            <img src={logo} width="40px" /> <h1>Slat</h1>
          </div>
          <h1>Forgot Your Password?</h1>
          <p className="forgot-text">
            Don&apos;t worry, it happens! Tell us your email address and
            we&apos;ll send you a password reset link.
          </p>
          <form className="forgot-form" onSubmit={submitHandler}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email Address"
              required
            />
            <br />
            <button className="btn">Request Password Reset</button>
            <div>
              <Link to="/auth/login" className="fgp">
                <span>
                  <b> &larr;</b> Back to Login
                </span>
              </Link>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};

export default ForgotPassword;
