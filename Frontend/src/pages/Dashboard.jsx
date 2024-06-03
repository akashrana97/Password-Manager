import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/PasswordList.css";

const Dashboard = () => {
  const { register, handleSubmit, reset } = useForm();
  const [passwords, setPasswords] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    setPasswords([...passwords, data]);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEdit = (index) => {
    // Implement edit functionality here
    console.log("Edit item at index", index);
  };

  const handleDelete = (index) => {
    // Implement delete functionality here
    setPasswords(passwords.filter((_, i) => i !== index));
  };

  return (
    <div className="password-manager">
      <header className="header">
        <h1>PassOP</h1>
        <h2>PassProtector: Your Secure Password Hub</h2>
      </header>

      <form className="password-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-row">
          <input
            className="full-width"
            type="text"
            placeholder="https://www.example.com"
            {...register("site", { required: true })}
          />
        </div>
        <div className="input-row">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <div className="button-row">
          <button type="submit" className="save-button">
            Add
          </button>
        </div>
      </form>

      <table className="password-table">
        <thead>
          <tr>
            <th>Site</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((item, index) => (
            <tr key={index}>
              <td>{item.site}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
              <td>
                <button
                  className="action-button"
                  onClick={() => handleEdit(index)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="action-button"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
