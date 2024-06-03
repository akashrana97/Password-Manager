import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useProfile } from "../Components/Hooks/UserHooks";

const AuthProtected = (props) => {
  const { userProfile, loading, token } = useProfile();
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
