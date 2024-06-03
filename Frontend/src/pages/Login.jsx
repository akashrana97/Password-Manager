import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/Login.css";
import ReCaptcha from "../Components/Common/reCaptchaV3";
import { loginUser, getLogUser } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    window.grecaptcha
      .execute("6LeyVmUpAAAAAAE8cCzQRWEdDp8wp0UFtbw39FFz", {
        action: "login",
      })
      .then((token) => {
        data.token = token;
        console.log(props);
        console.log("------data->", data);
        dispatch(loginUser(data, history));
      });
  };

  return (
    <>
      <ReCaptcha sitekey={"6LeyVmUpAAAAAAE8cCzQRWEdDp8wp0UFtbw39FFz"} />

      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field">
              <input
                type="text"
                placeholder="Email or Username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit">Sign In</button>
          </form>
          <div className="signup-link">
            New here? <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
