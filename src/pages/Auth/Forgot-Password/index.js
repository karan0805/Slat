import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api';
import logo from '../../../assets/images/logo.svg';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const nav = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    userApi.forgotUser(email).then(
      () => {
        toast.success('Successfully logged in..');
        nav('/');
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
