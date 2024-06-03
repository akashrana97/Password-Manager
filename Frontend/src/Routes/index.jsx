import React from "react";
import { Routes, Route } from "react-router-dom";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes.jsx";
import { AuthProtected } from "./AuthProtected.jsx";
import Navbar from "../Components/Navbar";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              // element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              element={route.component}
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                  <Navbar>{route.component}</Navbar>
                </AuthProtected>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;
