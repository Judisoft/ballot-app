import React from "react";
import { Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";



const ProtectedRoute =  ({children, redirectTo}) => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}


export default ProtectedRoute;