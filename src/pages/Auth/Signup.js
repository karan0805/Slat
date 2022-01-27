import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './Signup.css';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const [org, setOrg] = useState('');

  const nav = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    alert('thank you for registering');
    nav('/login');
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
          <h2>Sign Up to Slat</h2>
          <form className="signup-form" onSubmit={submitHandler}>
            <input
              type="text"
              value={fname}
              placeholder="First Name"
              onChange={(e) => setFname(e.target.value)}
              required
            />

            <input
              type="text"
              value={lname}
              placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)}
              required
            />

            <input
              type="text"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              value={pwd}
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              required
            />

            <input
              type="password"
              value={cpwd}
              placeholder="Confirm Password"
              onChange={(e) => setCpwd(e.target.value)}
              required
            />

            <input
              type="text"
              value={org}
              placeholder="Organization Code"
              onChange={(e) => setOrg(e.target.value)}
            />

            <button className="btn" type="submit">
              Submit
            </button>
            <div>
              Already have an account?
              <Link to="/auth/login" className="lgn">
                <span> Sign In</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
};

export default Signup;
