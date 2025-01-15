"use client";
import React, { useEffect, useCallback, memo, useState } from "react";
import { toast } from "react-hot-toast";
import { useFormValidation } from "@/hooks/useValidation";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import { checkEmailDelivery, partialSubmit } from "@/api/user";

const Step1 = () => {
  const { setSteps, userSearchData, mobileNumber } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailData, setEmailData] = useState(null); // To store form data for modal confirmation

  const handleConfirmEmail = async () => {
    setIsModalOpen(false);
    if (emailData) {
      await proceedWithSubmission(emailData); // Proceed with submission after modal confirmation
    }
  };

  const EmailConfirmationModal = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      setAnimate(true);
    }, []);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300">
        <div
          className={`relative m-2 w-full max-w-md rounded-3xl bg-white p-8 transition-all duration-300 ${
            animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="text-center">
            <h2 className="mb-4 text-lg font-semibold text-red-500">
              Email seems invalid. Would you like to proceed anyway?
            </h2>

            <div className="flex justify-center gap-10">
              <button
                onClick={handleConfirmEmail}
                className="w-[80px] rounded-xl p-1 text-[18px] font-bold text-white"
                style={{
                  background:
                    "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:gray-500 w-[80px] rounded-xl bg-gray-300 p-1 text-[18px] font-bold text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(["loan_amount", "email"]);

  const validateEmail = useCallback(
    async (email, userId) => {
      if (!email) return;

      try {
        const params = new URLSearchParams({
          email,
          mobile: mobileNumber,
          user_id: userId,
        });
        const emailResponse = await checkEmailDelivery(params);
        console.log("emailResponse", emailResponse);

        if (emailResponse?.data?.result === "valid") {
          setIsValidEmail(true);
        } else {
          setIsValidEmail(false);
        }
      } catch (error) {
        console.error("Email validation error:", error);
        toast.error("Unable to verify email. Please try again.");
      }
    },
    [mobileNumber],
  );

  const handleInputChange = useCallback(
    (field) => (event) => {
      const { value } = event.target;
      setValue(field, value);
      trigger(field);

      if (field === "email") {
        validateEmail(value, userSearchData?.id);
      }
    },
    [setValue, trigger, validateEmail, userSearchData],
  );

  const proceedWithSubmission = async (data) => {
    const payload = new URLSearchParams({
      mobile_no: mobileNumber,
      coloumn_name: "email",
      coloumn_value: data.email,
    });

    try {
      await partialSubmit(payload);
      sessionStorage.setItem("journey", "loanType");
      setSteps(2);
    } catch (error) {
      toast.error("❌ Error submitting the form.");
    }
  };

  const onSubmit = async (data) => {
    if (isValidEmail) {
      await proceedWithSubmission(data);
    } else {
      setEmailData(data);
      setIsModalOpen(true);
    }
  };

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

      {isModalOpen && <EmailConfirmationModal />}
    </div>
  );
};

export default memo(Step1);
