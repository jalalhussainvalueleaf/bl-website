"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import { useUserContext } from "../../../utils/UserContext";

const SecondStep = ({ onClick }) => {
  const router = useRouter();
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const { setSteps } = useUserContext();

  const fields = ["loanAmount", "email"];
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();

  // Load saved data on mount
  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("welcome")) || {};
    Object.keys(savedData).forEach((field) => {
      setValue(field, savedData[field]);
    });
  }, [setValue]);

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {}, [formData]);

  const handleChange = (field) => (e) => {
    setValue(field, e.target.value);
    trigger(field);
  };

  const onSubmit = async (data) => {
    try {
      const finalData = { ...data, loanType: selectedLoanType };
      // console.log("Form submitted successfully:", finalData);
      sessionStorage.setItem("welcome", JSON.stringify(formData));
      sessionStorage.setItem("journey", 2);
      setSteps(2);
      // onClick();
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
          <h2 className="py-8 text-2xl font-bold">What Is Your Email?</h2>
        </div>

        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Loan Amount"
                value={watch("loanAmount") || ""}
                onChange={handleChange("loanAmount")}
                error={errors.loanAmount?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Personal Email Address"
                value={watch("email") || ""}
                onChange={handleChange("email")}
                error={errors.email?.message}
              />
            </div>
            {/* <button>back</button> */}
            <Button btnName="Proceed" isLoading={isSubmitting} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
