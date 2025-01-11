import React from "react";
import { Route, Navigate } from "react-router-dom";

// PrivateRoute component that checks if the user is authenticated
const PrivateRoute = ({ Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("access_token");

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
