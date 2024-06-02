import React from "react";
import { Navigate } from "react-router-dom";
import Pagenotfound from "../pages/Pagenotfound";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Dashboard from "../pages/Dashboard";
import Registration from "../pages/Registration";

const authProtectedRoutes = [
  { path: "/", component: <Dashboard /> },
  { path: "*", component: <Navigate to="/pagenotfound" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Registration /> },
  { path: "/pagenotfound", component: <Pagenotfound /> },
];

export { authProtectedRoutes, publicRoutes };
