import React from "react";
import "../styles/Registration.css";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <form>
          <div className="input-field">
            <input type="text" required placeholder="First Name" />
          </div>
          <div className="input-field">
            <input type="text" required placeholder="Last Name" />
          </div>
          <div className="input-field">
            <input type="username" required placeholder="Username" />
          </div>
          <div className="input-field">
            <input type="email" required placeholder="Email" />
          </div>
          <div className="input-field">
            <input type="password" required placeholder="Password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="signin-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
