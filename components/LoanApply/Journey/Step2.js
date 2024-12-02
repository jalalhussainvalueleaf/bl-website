"use client";

import React, { useState } from "react";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";

const SecondStep = ({ onNext }) => {
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [error, setError] = useState("");

  const fields = ["personalLoan", "homeLoan"];

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();

  const onSubmit = async (data) => {
    if (!selectedLoanType) {
      setError("Please select a loan type.");
      return; // Prevent form submission
    } else {
      setError(""); // Clear error if selection is valid
      try {
        const finalData = { ...data, loanType: selectedLoanType };
        console.log("Form submitted successfully:", finalData);
        console.log("Step 2 submitted:", data);
        onNext(); // Call onNext to move to the next step
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const handleRadioChange = (value) => {
    setSelectedLoanType(value);
    sessionStorage.setItem("journey", 3);
    setError(""); // Clear the error when a selection is made
    console.log(value);
  };

  return (
    <div className="bg-white">
      <div className="mt-10 bg-white py-12">
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
                error={errors.personalLoan?.message}
              />
              <Radio
                name="homeLoan"
                value="homeLoan"
                isSelected={selectedLoanType === "homeLoan"}
                onChange={handleRadioChange}
                label="Home Loan"
                error={errors.homeLoan?.message}
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
