import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

const Navbar = () => {
  return (
    <div>
      <img src={logo} width="60px" height="60px" alt="not found" />
      <li>Why Slat?</li>
      <li>Features</li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Get Started</Link>
      </li>
    </div>
  );
};

export default Navbar;
