"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast"; // Import toast
import { useFormValidation } from "@/hooks/useValidation";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import { checkEmailDelivery, partialSubmit } from "@/api/user";

const SecondStep = ({ userData, mobileNumber }) => {
  const { setSteps } = useUserContext();

  // State for loan amount
  const [amount, setAmount] = useState("");

  // Form validation setup
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(["loan_amount", "email"]);

  // Populate form fields with userData on component mount
  useEffect(() => {
    if (userData) {
      Object.keys(userData).forEach((field) =>
        setValue(field, userData[field]),
      );
    }
  }, [userData, setValue]);

  // Handle input changes and validation
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setValue(field, value);
    trigger(field);

    // Special handling for loan amount
    if (field === "loan_amount") {
      setAmount(value);
      saveToSession("loan_amount", value);
    }

    // Special handling for email
    if (field === "email") {
      validateEmail(value, mobileNumber);
    }
  };

  // Save field data to session storage
  const saveToSession = (key, value) => {
    const savedData = JSON.parse(sessionStorage.getItem("welcome")) || {};
    savedData[key] = value;
    sessionStorage.setItem("welcome", JSON.stringify(savedData));
  };

  // Email validation with API
  const validateEmail = async (email, mobile) => {
    if (!email) return;

    try {
      await checkEmailDelivery(new URLSearchParams({ email, mobile }));
    } catch (error) {
      toast.error("❌ Unable to verify email. Please try again."); // Display toast error
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    const payload = new URLSearchParams({
      mobile_no: mobileNumber,
      coloumn_name: "email",
      coloumn_value: data.email,
    });

    try {
      await partialSubmit(payload); // Save email through API
      sessionStorage.setItem("journey", "2"); // Update user journey
      setSteps(2);
    } catch (error) {
      toast.error("❌ Error submitting the form."); // Display error toast
    }
  };

  return (
    <div className="mx-auto max-w-md px-5">
      <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
        What Is Your Email?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Loan Amount Input */}
        <Input
          type="text"
          placeholder="Loan Amount"
          value={watch("loan_amount") || amount}
          onChange={handleInputChange("loan_amount")}
          error={errors.loan_amount?.message}
        />
        {/* Email Input */}
        <Input
          type="text"
          placeholder="Personal Email Address"
          value={watch("email") || ""}
          onChange={handleInputChange("email")}
          error={errors.email?.message}
        />
        {/* Submit Button */}
        <Button btnName="Proceed" isLoading={isSubmitting} />
      </form>
    </div>
  );
};

export default SecondStep;
