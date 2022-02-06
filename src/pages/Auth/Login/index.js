import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../../api';
import logo from '../../../assets/images/logo.svg';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { login } from '../../../redux/slices/UserSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [, setAccessToken] = useLocalStorage('access_token', '');

  const nav = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    userApi.loginUser(email, pwd).then(
      (response) => {
        setAccessToken(response.data.data.token);
        dispatch(
          login({
            userdata: response.data.data.user,
            token: response.data.data.token,
            loggedIn: true,
          }),
        );
        toast.success('Successfully logged in..');
        nav('/dashboard');
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

          <form className="login-form" onSubmit={submitHandler}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email Address"
              required
            />
            <br />
            <input
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              placeholder="Password"
              required
            />
            <Link to="/auth/forgot-password" className="fgp">
              Forgot Password?
            </Link>
            <button className="btn">Sign In</button>
            <div>
              Don&apos;t have an account?
              <Link to="/auth/signup" className="sgp">
                <span> Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};

export default Login;
