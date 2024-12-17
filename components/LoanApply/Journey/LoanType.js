"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";

const SecondStep = () => {
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [error, setError] = useState("");
  const { setSteps } = useUserContext();

  const fields = ["personalLoan", "businessLoan"];

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();

  // Load saved data and selected loan type on mount
  useEffect(() => {
    const savedLoanType = sessionStorage.getItem("selectedLoanType");

    if (savedLoanType) {
      setSelectedLoanType(savedLoanType);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!selectedLoanType) {
      setError("Please select a loan type.");
      return; // Prevent form submission
    } else {
      setError(""); // Clear error if selection is valid
      try {
        const finalData = { ...data, loanType: selectedLoanType };
        console.log("Step 2 submitted:", finalData);
        sessionStorage.setItem("journey", selectedLoanType);
        setSteps(selectedLoanType);
        // Navigate to the next step or handle redirection
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const handleRadioChange = (value) => {
    setSelectedLoanType(value);
    sessionStorage.setItem("selectedLoanType", value); // Save the selection
    setError(""); // Clear the error when a selection is made
    console.log("Selected Loan Type:", value);
  };

  return (
    <div className="bg-white">
      <div className=" bg-white">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-2xl font-bold">What Type Of Loan?</h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <Radio
                name="personalLoan"
                value="personalLoan"
                isSelected={selectedLoanType === "personalLoan"}
                onChange={handleRadioChange}
                label="Personal Loan"
              />
              <Radio
                name="businessLoan"
                value="businessLoan"
                isSelected={selectedLoanType === "businessLoan"}
                onChange={handleRadioChange}
                label="Business Loan"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            <Button btnName="Proceed" isLoading={isSubmitting} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
