"use client";

import React, { useState } from "react";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";

const SecondStep = ({ onNext }) => {
  const [employmentType, setEmploymentType] = useState("");
  const [error, setError] = useState("");
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

  const onSubmit = async (data) => {
    if (!employmentType) {
      setError("Please select a employment type.");
      return; // Prevent form submission
    } else {
      setError(""); // Clear error if selection is valid
      try {
        const finalData = { ...data, employmentType: employmentType };
        // console.log("Form submitted successfully:", finalData);
        console.log("Step 2 submitted:", finalData);
        sessionStorage.setItem("journey", 35);
        onNext(); // Call onNext to move to the next step
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const handleRadioChange = (value) => {
    setEmploymentType(value);
    setError(""); // Clear the error when a selection is made
    console.log(value);
  };

  return (
    <div className="bg-white">
      <div className="mt-10 bg-white py-12">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-2xl font-bold">
            What Is Your Employment Type
          </h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
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

            <Button btnName="Proceed" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
