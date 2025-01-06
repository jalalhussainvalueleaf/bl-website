"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { sendSMS } from "@/api/user";
import OtpValidation from "./OtpValidation";

const INVALID_NUMBERS = [
  "1111111111",
  "2222222222",
  "3333333333",
  "4444444444",
  "5555555555",
  "6666666666",
  "7777777777",
  "8888888888",
  "9876543210",
  "1234567890",
];

const MOBILE_REGEX = /^[6-9]\d{9}$/;

const RightSection = ({ utmSource, utmMedium, utmCampaign, platform }) => {
  const [formState, setFormState] = useState({
    mobile: "",
    isValid: true,
    showOtpInput: false,
    isEditable: true,
    verifyOtp: false,
    errorMessage: "",
    isTransitioning: false,
    showNextBtn: false,
    userConsentCheck: true,
  });

  const inputRef = useRef([]);

  // Restore saved mobile number on initial load
  useEffect(() => {
    const savedMobile = sessionStorage.getItem("mobileNumber");
    if (savedMobile) {
      setFormState((prev) => ({
        ...prev,
        mobile: savedMobile,
        isEditable: false,
        showOtpInput: true,
      }));
    }
  }, []);

  // Validate mobile number
  const validateMobile = (number) => {
    return MOBILE_REGEX.test(number) && !INVALID_NUMBERS.includes(number);
  };

  // Handle mobile input change
  const handleInputChange = async (e) => {
    const value = e.target.value;

    setFormState((prev) => ({
      ...prev,
      mobile: value,
      errorMessage: "",
      isValid: true,
    }));

    if (value.length === 10) {
      if (!formState.userConsentCheck)
        return toast.error("Please provide your consent to proceed.");

      if (validateMobile(value)) {
        await sendOtp(value); // Send OTP if valid
      } else {
        setFormState((prev) => ({
          ...prev,
          isValid: false,
          showOtpInput: false,
          errorMessage: "❌ Invalid mobile number.",
        }));
        toast.error("Invalid mobile number.");
      }
    } else {
      setFormState((prev) => ({
        ...prev,
        showOtpInput: false,
      }));
    }
  };

  // Send OTP via API
  const sendOtp = async (mobile) => {
    try {
      const payload = new URLSearchParams({
        mobile,
        utm: "homepgbanappnowbtn",
        platform: "Nweb",
      });

      const response = await sendSMS(payload);
      handleSendSmsResponse(response?.data, mobile); // Handle OTP response
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isValid: false,
        showOtpInput: false,
        errorMessage: "Error sending OTP. Please try again.",
      }));
      toast.error("Error sending OTP");
    }
  };

  // Handle API response for sending OTP
  const handleSendSmsResponse = (response, mobile) => {
    if (response?.status === "success" && response?.HTTPStatus === 200) {
      console.log("my response", response.user_type);
      sessionStorage.setItem("mobileNumber", mobile);
      toast.success("OTP sent successfully");

      setFormState((prev) => ({
        ...prev,
        isTransitioning: true,
      }));

      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          verifyOtp: true,
          showOtpInput: true,
          isEditable: false,
          isTransitioning: false,
        }));
      }, 300);
      return;
    }

    if (response?.status === "failure" && response?.HTTPStatus === 405) {
      updateMessage(response.msg); // Display failure message
      setFormState((prev) => ({
        ...prev,
        verifyOtp: false,
        isValid: false,
      }));
      return;
    }

    if (response?.status === "failure" && response?.HTTPStatus === 200) {
      updateMessage(response.msg); // Display failure message
      setFormState((prev) => ({
        ...prev,
        verifyOtp: false,
        isValid: false,
      }));
      return;
    }
  };

  // Update success or error message
  const updateMessage = (text, isSuccess = false) => {
    const icon = isSuccess ? "✅" : "❌";
    if (isSuccess) {
      toast.success(text);
    } else {
      toast.error(text);
    }
  };

  // Handle edit mobile number click
  const handleEditClick = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      isTransitioning: true,
    }));

    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        isEditable: true,
        showOtpInput: false,
        isTransitioning: false,
        showNextBtn: true,
      }));
    }, 300);
    sessionStorage.removeItem("mobile");
  });

  // Focus input field when OTP input is displayed
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = formState.mobile.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [inputRef, formState.showOtpInput]);

  // Toogle user consent
  const toggleUserConsent = () => {
    setFormState((prev) => ({
      ...prev,
      userConsentCheck: !formState.userConsentCheck,
    }));
  };

  // Trigger OTP send when mobile is valid and user consent is given.
  useEffect(() => {
    if (formState.mobile.length == 10 && formState.userConsentCheck) {
      sendOtp(formState.mobile);
    }
  }, [formState.userConsentCheck]);

  return (
    <div className="m-auto flex max-w-[400px] flex-col items-center justify-center xl:max-w-[600px]">
      {/* Buddy loan Img  */}
      <Link href="/">
        <Image
          src="/images/buddyloan-logo.png"
          className="h-16 w-full"
          alt="Buddy Loan"
          width={100}
          height={200}
        />
      </Link>

      {/* Mobile View Banner */}
      <div className="block w-full xl:hidden">
        <img
          src="/images/nbanner.webp"
          alt="nBanner"
          className="mx-auto w-full max-w-[600px] py-6"
        />
      </div>

      {/* Title */}
      <h1 className="py-0 text-center text-xl xl:py-8 xl:text-3xl">
        Apply & Get{" "}
        <span className="font-semibold text-bl-blue">Loan Approved</span>{" "}
        Instantly
      </h1>

      <div className="max-w-[400px]">
        <div
          className={`transition-all duration-300 ease-in-out ${
            formState.isTransitioning
              ? "-translate-y-4 opacity-0"
              : "translate-y-4 opacity-100"
          }`}
        >
          {!formState.showOtpInput ? (
            // Mobile Input Section
            <>
              <div className="relative mb-4 flex w-full items-center">
                <input
                  ref={inputRef}
                  type="text"
                  className={`poppins h-[53px] w-full rounded-[12px] border 
                    ${formState.isValid ? "border-[#47B6F2]" : "border-red-500"}
                    ${!formState.isEditable ? "cursor-not-allowed bg-slate-200" : ""}
                    px-3 text-black outline-none focus:ring-0`}
                  placeholder=""
                  value={formState.mobile}
                  onChange={
                    formState.isEditable ? handleInputChange : undefined
                  }
                  maxLength="10"
                  readOnly={!formState.isEditable}
                />

                <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 rounded bg-slate-100 px-1 text-[#47B6F2]">
                  Mobile Number
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="user_consent"
                  checked={formState.userConsentCheck}
                  onChange={toggleUserConsent}
                  className="size-5 rounded-md border-2 border-gray-300 transition-all duration-200 ease-in-out focus:outline-none"
                />
                <label className="text-sm" htmlFor="user_consent">
                  By clicking &quot;Next,&quot; I confirm that this is my
                  registered mobile number and authorize Buddy Loan to use it
                  for communications related to my loan application, as per the
                  <a
                    href="https://www.buddyloan.com/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-1 font-semibold text-bl-blue no-underline"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and
                  <a
                    href="https://www.buddyloan.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-1 font-semibold text-bl-blue no-underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {!formState.isValid && (
                <p className="mt-5 text-center text-sm text-red-500">
                  {formState.errorMessage}
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-center">
                <p className="mr-2 text-xl text-gray-600">{formState.mobile}</p>
                <button
                  className="text-gray-500 transition-colors hover:text-black"
                  onClick={handleEditClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1l1-4l9.5-9.5z" />
                    </g>
                  </svg>
                </button>
              </div>

              {/* OTP Validation */}
              <OtpValidation
                utmSource={utmSource}
                utmMedium={utmMedium}
                platform={platform}
                mobile={formState?.mobile}
                verifyOtp={formState.verifyOtp}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
