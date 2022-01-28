import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { axiosInstance } from '../../axios';
import { login } from '../../features/UserSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [, setAccessToken] = useLocalStorage('access_token', '');

  const nav = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    axiosInstance.post('/api/auth/login', { email: email, password: pwd }).then(
      (response) => {
        setAccessToken(response.data.token);
        dispatch(
          login({
            email: email,
            token: response.data.token,
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
            <div className="fgp">Forgot Password?</div>
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
