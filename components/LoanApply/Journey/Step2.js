"use client";

import React, { useState } from "react";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";

const SecondStep = () => {
  const [selectedLoanType, setSelectedLoanType] = useState("");

  const fields = ["personalLoan", "homeLoan"];

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();

  const handleChange = (field) => (e) => {
    setValue(field, e.target.value);
    trigger(field);
  };

  const onSubmit = async (data) => {
    try {
      const finalData = { ...data, loanType: selectedLoanType };
      console.log("Form submitted successfully:", finalData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleRadioChange = (value) => {
    setSelectedLoanType(value);
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
              />
              <Radio
                name="homeLoan"
                value="homeLoan"
                isSelected={selectedLoanType === "homeLoan"}
                onChange={handleRadioChange}
                label="Home Loan"
              />
            </div>

            <Button btnName="Proceed" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
