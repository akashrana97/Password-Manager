// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Make sure to create and style this CSS file as needed

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>PassOP</h1>
          <button className="navbar-toggler" onClick={toggleNavbar}>
            ☰
          </button>
        </div>
        <ul className={`navbar-list ${isOpen ? "open" : ""}`}>
          <li className="navbar-item">
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="navbar-spacer"></div>
      {children}
    </>
  );
};

export default Navbar;
