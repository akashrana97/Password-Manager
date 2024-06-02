import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import Cookies from "js-cookie";

const AuthProtected = (props) => {
  let token = null;
  const isAuthenticated = !!Cookies.get("authUser");

  if (!isAuthenticated) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  // if (!userProfile && loading && !token) {
  if (!token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};
const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <React.Fragment>
            {" "}
            <Component {...props} />{" "}
          </React.Fragment>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
