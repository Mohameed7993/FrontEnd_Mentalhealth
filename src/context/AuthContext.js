import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUserData = localStorage.getItem('user');
    
    return savedUserData ? JSON.parse(savedUserData) : null;
  });
  // Function to handle user login
  const login = (userData) => {
    setUser(userData); // Update the state
    localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
  };

  // Function to handle user logout
  const logout = () => {

    setUser(null); // Clear the user state
    localStorage.removeItem('user'); // Clear from localStorage
  };

  // Optionally, react to changes in user state
  // This useEffect is useful for actions that depend on the user state
  // For this setup, it's not immediately necessary but added for future expansion
  useEffect(() => {
    // For example, redirect or fetch additional data based on user state
    // Or simply prepare for any side effects related to user changes
  }, [user]);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
