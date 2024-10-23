import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <AuthContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
