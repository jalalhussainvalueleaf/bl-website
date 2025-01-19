"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";
import BackButton from "@/components/Common/BackButton";

const Step31 = () => {
  const [salaryMode, setSalaryMode] = useState("");
  const [error, setError] = useState("");
  const { setSteps, userSearchData, setUserSearchData } = useUserContext();
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
  // useEffect(() => {
  //   const savedSalaryMode = sessionStorage.getItem("salaryMode");
  //   if (savedSalaryMode) {
  //     setSalaryMode(savedSalaryMode);
  //   }
  // }, [setValue]);

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
    if (value === "SalaryInBank") {
      setUserSearchData({
        ...userSearchData,
        salary_mode: "Direct Transfer to Bank Account",
      });
    } else {
      setUserSearchData({ ...userSearchData, salary_mode: "Cash" });
    }
    sessionStorage.setItem("salaryMode", value); // Save the selection
    setError(""); // Clear the error when a selection is made
  };

  function handleBack() {
    sessionStorage.setItem("journey", "personalLoan");
    setSteps("personalLoan");
  }

  useEffect(() => {
    if (userSearchData) {
      const { salary_mode } = userSearchData;

      if (salary_mode === "Direct Transfer to Bank Account") {
        setSalaryMode("SalaryInBank");
      } else {
        setSalaryMode("SalaryInCash");
      }
    }
  }, [userSearchData]);

  return (
    <div className="">
      <div className="">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
            Choose Salary Mode
          </h2>
        </div>
        <div className="mx-auto max-w-md px-5">
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

            <div className="my-4 mb-6 flex items-center justify-center gap-5">
              <BackButton backTo={"personalLoan"} />
              <Button btnName="Proceed" isLoading={isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step31;
