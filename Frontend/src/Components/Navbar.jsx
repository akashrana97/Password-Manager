// src/components/Navbar.js
import React, { Children } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Make sure to create and style this CSS file as needed

const Navbar = ({ children }) => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>PassOP</h1>
        </div>
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/logout">Logout</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
