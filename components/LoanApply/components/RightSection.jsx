"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { sendSMS } from "@/api/user";
import OtpValidation from "./OtpValidation";
import { encryptData64, decryptData64 } from "@/utils/cryptoUtils64";
import CONSTANTS from "@/utils/constants";

// Initial form state
const initialFormState = {
  mobile: "",
  isValid: true,
  showOtpInput: false,
  isEditable: true,
  verifyOtp: false,
  errorMessage: "",
  isTransitioning: false,
  showNextBtn: false,
  userConsentCheck: true,
};

const RightSection = ({ utmSource, utmMedium, utmCampaign, platform }) => {
  const [formState, setFormState] = useState(initialFormState);
  const inputRef = useRef(null);

  // Utility Functions
  const updateFormState = (updates) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  };

  const showToast = (message, type = "error") => {
    toast[type](message);
  };

  // Mobile Number Validation
  const validateMobile = (number) => {
    return (
      CONSTANTS.MOBILE_REGEX.test(number) &&
      !CONSTANTS.INVALID_NUMBERS.includes(number)
    );
  };

  // Session Storage Operations
  const saveToSession = async (mobile) => {
    const encrypted = await encryptData64(mobile);
    sessionStorage.setItem(CONSTANTS.STORAGE_KEYS.MOBILE, encrypted);
    return encrypted;
  };

  const removeFromSession = () => {
    sessionStorage.removeItem(CONSTANTS.STORAGE_KEYS.MOBILE);
  };

  // API Integration
  const sendOtp = async (mobile) => {
    try {
      const encryptedMobile = await saveToSession(mobile);
      const payload = new URLSearchParams({
        mobile: encryptedMobile,
        utm: "homepgbanappnowbtn",
        platform: "Nweb",
      });

      const response = await sendSMS(payload);
      handleSendSmsResponse(response?.data, encryptedMobile);
    } catch (error) {
      updateFormState({
        isValid: false,
        showOtpInput: false,
        errorMessage: "Error sending OTP. Please try again.",
      });
      showToast("Error sending OTP");
    }
  };

  // Response Handlers
  const handleSendSmsResponse = (response, mobile) => {
    if (response?.status === "success" && response?.HTTPStatus === 200) {
      showToast("OTP sent successfully", "success");
      handleSuccessfulOtpSend();
      return;
    }

    const isFailure = response?.status === "failure";
    if (isFailure) {
      updateFormState({
        verifyOtp: false,
        isValid: false,
      });
      showToast(response.msg);
      sessionStorage.setItem(CONSTANTS.STORAGE_KEYS.HASERROR, true);
    }
  };

  const handleSuccessfulOtpSend = () => {
    updateFormState({ isTransitioning: true });

    setTimeout(() => {
      updateFormState({
        verifyOtp: true,
        showOtpInput: true,
        isEditable: false,
        isTransitioning: false,
      });
    }, CONSTANTS.TRANSITION_DELAY);

    sessionStorage.setItem(CONSTANTS.STORAGE_KEYS.HASERROR, false);
  };

  // Event Handlers
  const handleInputChange = async (e) => {
    const value = e.target.value;
    updateFormState({
      mobile: value,
      errorMessage: "",
      isValid: true,
    });

    if (value.length === 10) {
      if (!formState.userConsentCheck) {
        showToast("Please provide your consent to proceed.");
        return;
      }

      if (validateMobile(value)) {
        await sendOtp(value);
      } else {
        updateFormState({
          isValid: false,
          showOtpInput: false,
          errorMessage: "❌ Invalid mobile number.",
        });
        showToast("Invalid mobile number.");
      }
    } else {
      updateFormState({ showOtpInput: false });
    }
  };

  const handleEditClick = useCallback(() => {
    updateFormState({ isTransitioning: true });

    setTimeout(() => {
      updateFormState({
        isEditable: true,
        showOtpInput: false,
        isTransitioning: false,
        showNextBtn: true,
      });
    }, CONSTANTS.TRANSITION_DELAY);

    removeFromSession();
  }, []);

  const toggleUserConsent = () => {
    updateFormState({
      userConsentCheck: !formState.userConsentCheck,
    });
  };

  // Effects
  useEffect(() => {
    const restoreMobileNumber = async () => {
      const savedMobile = sessionStorage.getItem(CONSTANTS.STORAGE_KEYS.MOBILE);
      const hasError = sessionStorage.getItem(CONSTANTS.STORAGE_KEYS.HASERROR);

      if (savedMobile) {
        const decryptedMobile = await decryptData64(savedMobile);

        if (hasError === "true") {
          updateFormState({
            mobile: decryptedMobile,
            isEditable: true,
            showOtpInput: false,
          });
        } else {
          console.log("else part");
          updateFormState({
            mobile: decryptedMobile,
            isEditable: false,
            showOtpInput: true,
          });
        }
      }
    };

    restoreMobileNumber();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = formState?.mobile?.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [formState.showOtpInput]);

  useEffect(() => {
    if (formState.mobile.length === 10 && formState.userConsentCheck) {
      sendOtp(formState.mobile);
    }
  }, [formState.userConsentCheck]);

  // UI Components
  const renderMobileInput = () => (
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
          onChange={formState.isEditable ? handleInputChange : undefined}
          maxLength="10"
          readOnly={!formState.isEditable}
        />
        <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 rounded bg-slate-100 px-1 text-[#47B6F2]">
          Mobile Number
        </label>
      </div>
      <UserConsent />
      {!formState.isValid && (
        <p className="mt-5 text-center text-sm text-red-500">
          {formState.errorMessage}
        </p>
      )}
    </>
  );

  const UserConsent = () => (
    <div className="flex items-start space-x-2">
      <input
        type="checkbox"
        id="user_consent"
        checked={formState.userConsentCheck}
        onChange={toggleUserConsent}
        className="size-5 rounded-md border-2 border-gray-300 transition-all duration-200 ease-in-out focus:outline-none"
      />
      <label className="text-sm" htmlFor="user_consent">
        By clicking &quot;Next,&quot; I confirm that this is my registered
        mobile number and authorize Buddy Loan to use it for communications
        related to my loan application, as per the{" "}
        <a
          href="https://www.buddyloan.com/terms-and-conditions"
          target="_blank"
          rel="noopener noreferrer"
          className="ps-1 font-semibold text-bl-blue no-underline"
        >
          Terms & Conditions
        </a>{" "}
        and{" "}
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
  );

  const renderOtpSection = () => (
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
      <OtpValidation
        utmSource={utmSource}
        utmMedium={utmMedium}
        platform={platform}
        mobileNumber={formState?.mobile}
        verifyOtp={formState.verifyOtp}
      />
    </>
  );

  // Main Render
  return (
    <div className="m-auto flex max-w-[400px] flex-col items-center justify-center xl:max-w-[600px]">
      <Link href="/">
        <Image
          src="/images/buddyloan-logo.png"
          className="h-16 w-full"
          alt="Buddy Loan"
          width={100}
          height={200}
        />
      </Link>

      <div className="block w-full xl:hidden">
        <img
          src="/images/nbanner.webp"
          alt="nBanner"
          className="mx-auto w-full max-w-[600px] py-6"
        />
      </div>

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
          {!formState.showOtpInput ? renderMobileInput() : renderOtpSection()}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
