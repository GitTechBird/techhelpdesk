// src/contexts/BaseUrlContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBaseUrl } from "../utils/urlUtil.ts";

// Create the context
const BaseUrlContext = createContext();

// Custom hook to use the BaseUrlContext
export const useBaseUrl = () => useContext(BaseUrlContext);



// Provider component
export const BaseUrlProvider = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState(getBaseUrl());

  // Update the base URL when window.location changes
  useEffect(() => {
    const handleLocationChange = () => setBaseUrl(getBaseUrl());
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <BaseUrlContext.Provider value={{ baseUrl, setBaseUrl }}>
      {children}
    </BaseUrlContext.Provider>
  );
};
