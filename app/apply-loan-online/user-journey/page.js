"use client";
import React, { useState, useEffect } from "react";
import Step1 from "../../../components/LoanApply/Journey/Step1";
import Step2 from "../../../components/LoanApply/Journey/Step2";
import Step3 from "../../../components/LoanApply/Journey/Step3";
import Step31 from "../../../components/LoanApply/Journey/Step31";
import Step32 from "../../../components/LoanApply/Journey/Step32";
import Step33 from "../../../components/LoanApply/Journey/Step33";
import Step34 from "../../../components/LoanApply/Journey/Step34";
import Step35 from "../../../components/LoanApply/Journey/Step35";

export default function Page() {
  // Initialize the journey state from sessionStorage or set to the first step
  const [journey, setJourney] = useState(() => {
    const savedJourney = sessionStorage.getItem("journey");
    return savedJourney ? parseInt(savedJourney, 10) : 1; // Default to step 1 if nothing is saved
  });

  // Update the journey state when sessionStorage changes
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === sessionStorage && event.key === "journey") {
        const newJourney = parseInt(event.newValue, 10);
        if (!isNaN(newJourney)) {
          setJourney(newJourney);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Update sessionStorage whenever the journey changes
  useEffect(() => {
    if (journey !== null) {
      sessionStorage.setItem("journey", journey);
    }
  }, [journey]);

  // Function to go to the next step or a specific step
  const goToStep = (step) => {
    setJourney(step);
  };

  // Render the current step
  const renderStep = () => {
    switch (journey) {
      case 1:
        return <Step1 onClick={() => goToStep(2)} />;
      case 2:
        return <Step2 onClick={() => goToStep(journey)} />;
      case 3:
        return <Step3 onClick={() => goToStep(journey)} />;
      case 31:
        return <Step31 onClick={() => goToStep(journey)} />;
      case 32:
        return <Step32 onClick={() => goToStep(journey)} />;
      case 33:
        return <Step33 onClick={() => goToStep(journey)} />;
      case 34:
        return <Step34 onClick={() => goToStep(journey)} />;
      case 35:
        return <Step35 onClick={() => goToStep(journey)} />;
      default:
        return <div>All steps completed!</div>;
    }
  };

  return (
    <div>
      {renderStep()}
      my journey start here - {journey}
    </div>
  );
}
