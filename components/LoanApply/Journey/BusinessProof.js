"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";

const SecondStep = () => {
  const [businessProof, setBusinessProof] = useState("");
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
    const savedBusinessProof = sessionStorage.getItem("selectedBusinessProof");
    if (savedBusinessProof) {
      setBusinessProof(savedBusinessProof);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!businessProof) {
      setError("Please select a Business Proof.");
      return; // Prevent form submission
    } else {
      setError(""); // Clear error if selection is valid
      try {
        const finalData = { ...data, businessProof: businessProof };
        console.log("Step 3 submitted:", finalData);
        sessionStorage.setItem("journey", businessProof);
        setSteps(businessProof);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const handleRadioChange = (value) => {
    setBusinessProof(value);
    sessionStorage.setItem("selectedBusinessProof", value); // Save the selection
    setError(""); // Clear the error when a selection is made
    console.log(value);
  };

  return (
    <div className="bg-white">
      <div className=" bg-white">
        <div className="mx-auto max-w-md px-5 py-8">
          <h2 className="text-2xl font-bold">
            Do You Have Any Business Proof?
          </h2>
          <small>
            (Ex - GST, Udyam, Shop & Establishment, Gumasta, FSSAI License.)
          </small>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <Radio
                value="yes"
                isSelected={businessProof === "yes"}
                onChange={handleRadioChange}
                label="Yes"
              />
              <Radio
                value="no"
                isSelected={businessProof === "no"}
                onChange={handleRadioChange}
                label="No"
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
