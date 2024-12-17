"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../../utils/UserContext";
import Step1 from "../../../components/LoanApply/Journey/YourEmail";
import Step2 from "../../../components/LoanApply/Journey/LoanType";
import Step3 from "../../../components/LoanApply/Journey/EmploymentType";
import Step31 from "../../../components/LoanApply/Journey/SalaryMode";
import Step32 from "../../../components/LoanApply/Journey/WorkDetails";
import Step33 from "../../../components/LoanApply/Journey/PersonalDetails";
import Step34 from "../../../components/LoanApply/Journey/CommunicationAddress";
import Step35 from "../../../components/LoanApply/Journey/IncomeBankDetails";
import BusinessProof from "../../../components/LoanApply/Journey/BusinessProof";
import BusinessDetails from "../../../components/LoanApply/Journey/BusinessDetails";
import ProfessionType from "../../../components/LoanApply/Journey/ProfessionType";

export default function Page() {
  const router = useRouter();
  const { steps } = useUserContext();
  const [countSteps, setCountSteps] = useState("1"); // Default to string for consistency

  // Update countSteps based on sessionStorage or context steps
  useEffect(() => {
    const savedStep = sessionStorage.getItem("journey");
    const checkMobile = sessionStorage.getItem("mobileNumber");
    if (checkMobile && savedStep) {
      setCountSteps(savedStep);
    } else {
      router.push("/apply-loan-online/");
    }

    if (savedStep) {
      setCountSteps(savedStep); // Use string for consistency with `switch` cases
    } else {
      setCountSteps(String(steps)); // Ensure steps is converted to string
    }
  }, [steps]);

  // Listen for sessionStorage changes (e.g., updates from other tabs)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === sessionStorage && event.key === "journey") {
        const newStep = event.newValue;
        if (newStep) {
          setCountSteps(newStep); // Update `countSteps` on storage change
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Render the correct step component based on `countSteps`
  const renderStep = () => {
    switch (countSteps) {
      case "2":
        return <Step2 />;
      case "personalLoan":
        return <Step3 />;
      case "businessLoan":
        return <BusinessProof />;
      case "yes":
        return <BusinessDetails />;
      case "no":
        return <ProfessionType />;
      case "Salaried":
        return <Step31 />;
      case "Self-Employed":
        return <ProfessionType />;
      case "SalaryInBank":
        return <Step32 />;
      case "personalDetails":
        return <Step33 />;
      case "Student":
        return <Step33 />;
      case "communicationAddress":
        return <Step34 />;
      case "finish":
        return <Step35 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <img src="/images/buddyloan-logo.png" className="w-40" />
      </div>
      <div>
        {renderStep()}
        {/* <p>My journey - {countSteps}</p> */}
      </div>
    </div>
  );
}
