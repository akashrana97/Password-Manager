// PasswordModal.js
import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import "../styles/PasswordModal.css"; // Create and style this CSS file as needed
import { useDispatch } from "react-redux";
import { AddPasswordList } from "../store/PasswordList/passwordListReducer";

Modal.setAppElement("#root"); // Make sure this matches your root element id

const PasswordModal = ({ isOpen, onRequestClose, onSubmit, currentRecord }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    if (currentRecord) {
      data.id = currentRecord.id;
    }
    onSubmit(data);
    reset();
    onRequestClose();
  };


  useEffect(() => {
    if (currentRecord) {
      setValue("website_name", currentRecord.website_name);
      setValue("website_url", currentRecord.website_url);
      setValue("username", currentRecord.username);
      setValue("password", currentRecord.password);
    } else {
      reset();
    }
  }, [currentRecord, setValue, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Password"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{`${currentRecord ? "Update" : "Add"}`} New Password</h2>
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
            {`${currentRecord ? "Update" : "Add"}`}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;
