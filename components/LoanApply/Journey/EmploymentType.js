"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";

const SecondStep = () => {
  const [employmentType, setEmploymentType] = useState("");
  const [error, setError] = useState("");
  const { setSteps } = useUserContext();
  const fields = ["Salaried", "Self-Employed", "Student"];

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
    const savedEmploymenType = sessionStorage.getItem("selectedEmploymentType");
    if (savedEmploymenType) {
      setEmploymentType(savedEmploymenType);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!employmentType) {
      setError("Please select a employment type.");
      return; // Prevent form submission
    } else {
      setError(""); // Clear error if selection is valid
      try {
        const finalData = { ...data, employmentType: employmentType };
        console.log("Step 3 submitted:", finalData);
        sessionStorage.setItem("journey", employmentType);
        setSteps(employmentType);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const handleRadioChange = (value) => {
    setEmploymentType(value);
    // Retrieve the existing session data
    const existingData = sessionStorage.getItem("welcome"); 
    let sessionData = existingData ? JSON.parse(existingData) : {};

    // Update the session data with the selected loan type
    sessionData.selectedEmploymentType = value;

    // Save the updated session data back to session storage
    sessionStorage.setItem("welcome", JSON.stringify(sessionData));

    sessionStorage.setItem("selectedEmploymentType", value); // Save the selection
    setError(""); // Clear the error when a selection is made
    console.log(value);
  };

  return (
    <div className="">
      <div className="">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
            What Is Your Employment Type
          </h2>
        </div>
        <div className="mx-auto max-w-md px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <Radio
                name="Salaried"
                value="Salaried"
                isSelected={employmentType === "Salaried"}
                onChange={handleRadioChange}
                label="Salaried"
              />
              <Radio
                name="Self-Employed"
                value="Self-Employed"
                isSelected={employmentType === "Self-Employed"}
                onChange={handleRadioChange}
                label="Self-Employed"
              />
              <Radio
                name="Student"
                value="Student"
                isSelected={employmentType === "Student"}
                onChange={handleRadioChange}
                label="Student"
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
