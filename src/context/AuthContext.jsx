// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Set the user state based on the token
      setUser({ email: 'user@example.com' }); // Replace with actual user data if available
    }
  }, []);

  const login = async (email, password) => {
    const token = await authService.login(email, password);
    localStorage.setItem('token', token);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);