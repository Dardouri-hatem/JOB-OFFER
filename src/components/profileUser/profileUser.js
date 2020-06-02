import React, { useState } from "react";
import { connect } from "react-redux";
import "./profile.css";
import { Button, Alert } from "react-bootstrap";
import {
  deleteUser,
  updateUser,
  updatePassword,
} from "../../JS/actions/authActions";
import { Redirect } from "react-router-dom";
import ModalConfirm from "../modalConfirm/modalConfirm";
import { message } from "antd";


function ProfileUser(props) {
  const [updatePassword, setPassword] = useState({
    password: "",
    repeatPassword: "",
  });

  const [updatedUser, setUpdatedUser] = useState({
    name: props.user ? props.user.name : "",
    email: props.user ? props.user.email : "",
  });
  const [id] = useState(props.user ? props.user._id : "");

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    setPassword({ ...updatePassword, [e.target.name]: e.target.value });
  };
  const updateUser = ({ updatedUser, id }) => {
    props.updateUser({ updatedUser, id });
    if (!props.error.id) {
      message.success("Account updated !!!");
    }
  };

  return !props.user ? (
    <Redirect to="/login"></Redirect>
  ) : (
    <div className="container-profile bg-light">
      <h3>My account</h3>
      <div className="container-edit">
        {props.error.id !== "UPDATE_FAIL" ? null : (
          <Alert variant="danger">{props.error.msg}</Alert>
        )}
        <label>Your Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Entre Name"
          name="name"
          value={updatedUser.name}
          onChange={(e) => handleChange(e)}
        />
        <label>Your adress email</label>

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="form-control"
          onChange={(e) => handleChange(e)}
          value={updatedUser.email}
        ></input>
        <Button
          className="btn-update"
          onClick={() => updateUser({ updatedUser, id })}
        >
          Update
        </Button>
      </div>
      <h5>Change your password</h5>
      <div className="container-edit">
        {props.error.id !== "UPDATE_PASSWORD_FAIL" ? null : (
          <Alert variant="danger">{props.error.msg}</Alert>
        )}
        <label> Current Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Current Password"
          value={updatePassword.password}
          onChange={(e) => handleChange(e)}
        />
        <label>New Password</label>
        <input
          type="password"
          name="repeatPassword"
          className="form-control"
          placeholder="New Password"
          value={updatePassword.repeatPassword}
          onChange={(e) => handleChange(e)}
        />
        <Button
          className=" btn-update"
          onClick={() => props.updatePassword({ updatePassword, id })}
        >
          Confirm
        </Button>
      </div>
      <div className="remove-account mb-4">
        <h6>Remove Account</h6>
        <p>You have the option to delete your account</p>
        <p>NB: you will can't login with this account again </p>
        <ModalConfirm confirm={() => props.deleteUser(id)} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { user: state.auth.user, token: state.auth.token, error: state.error };
};
export default connect(mapStateToProps, {
  deleteUser,
  updateUser,
  updatePassword,
})(ProfileUser);
