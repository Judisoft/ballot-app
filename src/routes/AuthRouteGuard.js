import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRouteGuard = ({ children, redirectTo }) => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  return isAuthenticated ? <Navigate to={redirectTo} /> : children ;
};

export default AuthRouteGuard;