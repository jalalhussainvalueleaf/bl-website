"use client";

import React, { useState } from "react";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";

const SecondStep = () => {
  const [salaryMode, setSalaryMode] = useState("");

  const fields = ["Salary-in-Bank", "Salary-in-Cash"];

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
      const finalData = { ...data, salaryMode: salaryMode };
      console.log("Form submitted successfully:", finalData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleRadioChange = (value) => {
    setSalaryMode(value);
  };

  return (
    <div className="bg-white">
      <div className="mt-10 bg-white py-12">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-2xl font-bold">Choose Salary Mode 31</h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <Radio
                name="Salary-in-Bank"
                value="Salary-in-Bank"
                isSelected={salaryMode === "Salary-in-Bank"}
                onChange={handleRadioChange}
                label="Salary in Bank"
              />
              <Radio
                name="Salary-in-Cash"
                value="Salary-in-Cash"
                isSelected={salaryMode === "Salary-in-Cash"}
                onChange={handleRadioChange}
                label="Salary in Cash"
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
