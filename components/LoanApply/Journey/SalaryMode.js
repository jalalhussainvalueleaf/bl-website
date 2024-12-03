"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";

const SecondStep = () => {
  const [salaryMode, setSalaryMode] = useState("");
  const [error, setError] = useState("");
  const { setSteps } = useUserContext();
  const fields = ["SalaryInBank", "SalaryInCash"];

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

  // Load saved data and selected loan type on mount
  useEffect(() => {
    const savedSalaryMode = sessionStorage.getItem("salaryMode");
    if (savedSalaryMode) {
      setSalaryMode(savedSalaryMode);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!salaryMode) {
      setError("Please select a salary mode.");
      return; // Prevent form submission
    } else {
      setError(""); // Clear error if selection is valid
      try {
        const finalData = { ...data, salaryMode: salaryMode };
        console.log("Step 3 submitted:", finalData);
        sessionStorage.setItem("journey", salaryMode);
        setSteps(salaryMode);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const handleRadioChange = (value) => {
    setSalaryMode(value);
    sessionStorage.setItem("salaryMode", value); // Save the selection
    setError(""); // Clear the error when a selection is made
    console.log(value);
  };

  return (
    <div className="bg-white">
      <div className="mt-10 bg-white py-12">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-2xl font-bold">Choose Salary Mode</h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <Radio
                name="Salaried"
                value="SalaryInBank"
                isSelected={salaryMode === "SalaryInBank"}
                onChange={handleRadioChange}
                label="Salary In Bank"
              />
              <Radio
                name="SalaryInCash"
                value="SalaryInCash"
                isSelected={salaryMode === "SalaryInCash"}
                onChange={handleRadioChange}
                label="Salary In Cash"
              />

              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            <Button btnName="Proceed" isLoading={isSubmitting} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
