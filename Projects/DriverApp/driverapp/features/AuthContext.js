import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the logged-in user

  const login = (userData) => {
    // You can add any logic here for login, e.g., API calls, authentication, etc.
    setUser(userData); // Set the logged-in user data
  };

  const logout = () => {
    // You can add any logic here for logout, e.g., clearing storage, API calls, etc.
    setUser(null); // Clear the user data
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };