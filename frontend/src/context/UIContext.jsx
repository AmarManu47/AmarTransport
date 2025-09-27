// frontend/src/context/UIContext.jsx
import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <UIContext.Provider value={{
      theme, setTheme,
      drawerOpen, setDrawerOpen
    }}>
      {children}
    </UIContext.Provider>
  );
};
