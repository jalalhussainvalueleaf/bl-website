"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import OtpValidation from "./OtpValidation";
import CarouselSlider from "@/components/LoanApply/Slider";
import toast from "react-hot-toast";
import { sendSMS } from "@/api/user";

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

const INITIAL_STATE = {
  loading: false,
  message: "",
  canVerifyOtp: true,
};

const MobileValidation = ({ utmSource, utmMedium, utmCampaign, platform }) => {
  const [formState, setFormState] = useState({
    mobile: "",
    isValid: true,
    showOtpInput: false,
    isEditable: true,
    verifyOtp: true,
    errorMessage: "",
    isTransitioning: false,
    showNextBtn: false,
  });

  const [state, setState] = useState(INITIAL_STATE);
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
      if (validateMobile(value)) {
        await sendOtp(value); // Send OTP if valid
      } else {
        setFormState((prev) => ({
          ...prev,
          isValid: false,
          showOtpInput: false,
          errorMessage: "Invalid mobile number.",
        }));
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
    setState((prev) => ({ ...prev, message: `${icon} ${text}` }));
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

  return (
    <div className="grid lg:grid-cols-2">
      <CarouselSlider />
      <div className="flex flex-col items-center justify-center bg-slate-100">
        <Link href="/">
          <Image
            src="/images/buddyloan-logo.png"
            className="h-16 w-full"
            alt="Buddy Loan"
            width={100}
            height={200}
          />
        </Link>

        <h1 className="py-12 text-3xl">
          Apply & Get{" "}
          <span className="font-semibold text-bl-blue">Loan Approved</span>{" "}
          Instantly
        </h1>

        <div className="w-6/12">
          <div
            className={`transition-all duration-300 ease-in-out ${
              formState.isTransitioning
                ? "-translate-y-4 transform opacity-0"
                : "translate-y-4 transform opacity-100"
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

                <div className="leading-1">
                  <small>
                    By clicking &quot;Next,&quot; I confirm that this is my
                    registered mobile number and authorize Buddy Loan to use it
                    for communications related to my loan application, as per
                    the Terms & Conditions and Privacy Policy.
                  </small>
                </div>

                {!formState.isValid && (
                  <p className="text-sm text-red-500">
                    {formState.errorMessage}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <p className="mr-2 text-xl text-gray-600">
                    {formState.mobile}
                  </p>
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
                  utmCampaign={utmCampaign}
                  platform={platform}
                  mobile={formState?.mobile}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileValidation;
