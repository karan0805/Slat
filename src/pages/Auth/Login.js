import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../features/UserSlice';
import logo from '../../assets/images/logo.svg';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const nav = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: email,
        pwd: pwd,
        loggedIn: true,
      }),
    );
    nav('/dashboard');
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
          <h2>Login to Slat</h2>

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
