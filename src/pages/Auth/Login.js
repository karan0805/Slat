import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/UserSlice';

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

  return (
    <>
      <div>Login</div>
      <form onSubmit={submitHandler}>
        <label>
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </label>
        <p>Forgot Password?</p>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Login;
