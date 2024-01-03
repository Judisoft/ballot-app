// AuthProvider.js
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    navigate('/ballot');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;