import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <>
      <div>Signup</div>
      <form onSubmit={submitHandler}>
        <label>
          <p>First Name: </p>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Last Name: </p>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Email: </p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Password: </p>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Confirm Password: </p>
          <input
            type="password"
            value={cpwd}
            onChange={(e) => setCpwd(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Organization Code: </p>
          <input
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Signup;
