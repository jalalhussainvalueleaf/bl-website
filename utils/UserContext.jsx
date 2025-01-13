"use client";
import React, { createContext, useState, useContext } from "react";

// Create context with a descriptive name
const UserContext = createContext(undefined);

// Custom hook with error checking
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};

// Provider component with organized state
export const UserProvider = ({ children }) => {
  // Group related state together
  const [userData, setUserData] = useState({
    userId: "",
    userSearchData: "",
    mobileNumber: "",
  });

  const [journeyState, setJourneyState] = useState({
    steps: "",
    startUserNewJourney: false,
    showOfferPage: false,
  });

  // Helper functions for cleaner state updates
  const updateUserData = (updates) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  const updateJourneyState = (updates) => {
    setJourneyState((prev) => ({ ...prev, ...updates }));
  };

  const value = {
    ...userData,
    ...journeyState,
    setUserId: (id) => updateUserData({ userId: id }),
    setUserSearchData: (data) => updateUserData({ userSearchData: data }),
    setMobileNumber: (data) => updateUserData({ mobileNumber: data }),
    setSteps: (steps) => updateJourneyState({ steps }),
    setStartUserNewJourney: (start) =>
      updateJourneyState({ startUserNewJourney: start }),
    setShowOfferPage: (show) => updateJourneyState({ showOfferPage: show }),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
