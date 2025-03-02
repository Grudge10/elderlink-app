import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

    // Placeholder functions
  const updateProfile = () => {};

  const value = {
    profile,
    updateProfile
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
