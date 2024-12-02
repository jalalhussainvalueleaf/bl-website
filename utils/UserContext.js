"use client";
import React, { createContext, useState, useContext } from "react";

// Create context
const AppContext = createContext();

export const useUserContext = () => {
  return useContext(AppContext);
};

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [steps, setSteps] = useState("");
  const [startUserNewJourney, setStartUserNewJourney] = useState(false);
  const [showOfferPage, setShowOfferPage] = useState(false);

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        steps,
        setSteps,
        startUserNewJourney,
        setStartUserNewJourney,
        showOfferPage,
        setShowOfferPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
