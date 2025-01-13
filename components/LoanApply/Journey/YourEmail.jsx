"use client";
import React, { useEffect, useCallback, memo } from "react";
import { toast } from "react-hot-toast";
import { useFormValidation } from "@/hooks/useValidation";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import { checkEmailDelivery, partialSubmit } from "@/api/user";

const Step1 = () => {
  const { setSteps, userSearchData, mobileNumber } = useUserContext();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(["loan_amount", "email"]);

  // Memoized email validation
  const validateEmail = useCallback(
    async (email) => {
      if (!email) return;

      try {
        const params = new URLSearchParams({ email, mobile: mobileNumber });
        await checkEmailDelivery(params);
      } catch (error) {
        console.error("Email validation error:", error);
        toast.error("Unable to verify email. Please try again.");
      }
    },
    [mobileNumber],
  );

  // Memoized input change handler
  const handleInputChange = useCallback(
    (field) => (event) => {
      const { value } = event.target;
      setValue(field, value);
      trigger(field);

      if (field === "email") {
        validateEmail(value);
      }
    },
    [setValue, trigger, validateEmail],
  );

  // Form submission handler
  const onSubmit = async (data) => {
    const payload = new URLSearchParams({
      mobile_no: mobileNumber,
      coloumn_name: "email",
      coloumn_value: data.email,
    });

    try {
      await partialSubmit(payload); // Save email through API
      sessionStorage.setItem("journey", "loanType"); // Update user journey
      setSteps(2);
    } catch (error) {
      toast.error("❌ Error submitting the form."); // Display error toast
    }
  };

  // Initialize form with user data
  useEffect(() => {
    if (userSearchData) {
      Object.entries(userSearchData).forEach(([field, value]) => {
        setValue(field, value);
      });
    }
  }, [userSearchData, setValue]);

  return (
    <div className="mx-auto max-w-md px-5">
      <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
        What Is Your Email?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Input
          type="text"
          placeholder="Loan Amount"
          value={watch("loan_amount") || ""}
          onChange={handleInputChange("loan_amount")}
          error={errors.loan_amount?.message}
          aria-label="Loan Amount"
        />

        <Input
          type="email"
          placeholder="Personal Email Address"
          value={watch("email") || ""}
          onChange={handleInputChange("email")}
          error={errors.email?.message}
          aria-label="Email Address"
        />

        <Button
          btnName="Proceed"
          isLoading={isSubmitting}
          disabled={isSubmitting || Object.keys(errors).length > 0}
        />
      </form>
    </div>
  );
};

export default memo(Step1);
