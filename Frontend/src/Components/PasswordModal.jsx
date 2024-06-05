// PasswordModal.js
import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import "../styles/PasswordModal.css"; // Create and style this CSS file as needed

Modal.setAppElement("#root"); // Make sure this matches your root element id

const PasswordModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(); // Reset form after submission
    onRequestClose(); // Close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Password"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add New Password</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <label>Website Name</label>
          <input
            type="text"
            {...register("website_name", { required: true })}
            autoComplete="off"
          />
          {errors.website_name && (
            <p className="error">Website name is required</p>
          )}
        </div>
        <div className="form-group">
          <label>Website URL</label>
          <input
            type="text"
            {...register("website_url", { required: true })}
            autoComplete="off"
          />
          {errors.website_url && (
            <p className="error">Website URL is required</p>
          )}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            autoComplete="off"
          />
          {errors.username && <p className="error">Username is required</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            autoComplete="off"
          />
          {errors.password && <p className="error">Password is required</p>}
        </div>
        <div className="button-group">
          <button
            type="button"
            className="cancel-button"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;
