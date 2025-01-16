"use client";
import React, { useState, useRef, useEffect, memo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { resendOTP, verifyOTP } from "@/api/user";
import { encryptData } from "@/utils/cryptoUtils";
import { useUserContext } from "@/utils/UserContext";
import CONSTANTS from "@/utils/constants";
import OtpTimer from "./OtpTimer";
import { encryptData64 } from "@/utils/cryptoUtils64";

const OtpValidation = ({
  totalDigits = 4,
  utmSource,
  utmMedium,
  platform,
  verifyOtp,
  mobileNumber,
}) => {
  // State and Refs
  const [otpValues, setOtpValues] = useState(Array(4).fill(""));
  const [state, setState] = useState({
    loading: false,
    message: "",
    canVerifyOtp: true,
  });
  const inputRefs = useRef([]);
  const router = useRouter();

  // Context
  const { setUserId, setStartUserNewJourney, setShowOfferPage } =
    useUserContext();

  // Utility Functions
  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const showMessage = (text, isSuccess = false) => {
    const icon = isSuccess ? "✅" : "❌";
    updateState({ message: `${icon} ${text}` });
    toast[isSuccess ? "success" : "error"](text);
  };

  // API Integration Functions
  const handleOtpVerification = async (enteredOtp) => {
    updateState({ loading: true });

    try {
      const payload = new URLSearchParams({
        mobile_no: mobileNumber,
        mobile_otp: enteredOtp,
        platform,
        utm: utmMedium,
        utm_source: utmSource,
        user_consent: 2,
      });

      const response = await verifyOTP(payload);
      handleVerificationResponse(response?.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || CONSTANTS.MESSAGES.UNEXPECTED_ERROR;
      showMessage(errorMessage);
      updateState({ hasError: true });
    } finally {
      updateState({ loading: false });
    }
  };

  // Handle verification response
  const handleVerificationResponse = (response) => {
    const isSuccess =
      response?.status === "success" && response?.message === "OTP Match";
    const isFailure =
      response?.status === "failure" && response?.HTTPStatus === 405;

    if (isSuccess) {
      showMessage(response.message, true);
      if (response?.loan_status_30 === 0) {
        sessionStorage.setItem("_token", response?.user_token);
        sessionStorage.setItem("loan_status_30", 0);
        sessionStorage.setItem(CONSTANTS.STORAGE_KEYS.JOURNEY, "start");
        router.push("/apply-loan-online/user-journey");
      } else {
        router.push("/apply-loan-online/user-status");
      }

      return;
    }

    if (isFailure) {
      showMessage(response.message);
      updateState({ canVerifyOtp: false });
      return;
    }

    showMessage(response?.message);
  };

  // Encrypt mobiile number
  const encryptMobileNumber = async (mobile) => {
    const encrypted = await encryptData64(mobile);
    return encrypted;
  };

  const reSendOtp = async () => {
    updateState({ loading: true });
    const encryptedMobile = await encryptMobileNumber(mobileNumber);
    try {
      const payload = new URLSearchParams({
        mobile: encryptedMobile,
        utm: "homepgbanappnowbtn",
        platform: "Nweb",
      });

      const response = await resendOTP(payload);
      const isSuccess = response.data.status === "success";

      if (isSuccess) {
        showMessage(CONSTANTS.MESSAGES.OTP_SUCCESS, true);
      } else {
        showMessage(response.data.message);
      }
    } catch (error) {
      showMessage(
        error?.response?.data?.message || CONSTANTS.MESSAGES.UNEXPECTED_ERROR,
      );
      updateState({ hasError: true });
    } finally {
      updateState({ loading: false });
    }
  };

  // Event Handlers
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!CONSTANTS.OTP_REGEX.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < totalDigits - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtpValues.every((digit) => digit !== "")) {
      handleOtpVerification(newOtpValues.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Effect for focus input
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // UI Components
  const renderOtpInputs = () => (
    <div className="flex items-center justify-center space-x-2">
      {otpValues.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="block size-12 rounded-lg border border-gray-300 text-center text-sm font-extrabold focus:border-bl-blue focus:ring-2 focus:ring-bl-blue"
        />
      ))}
    </div>
  );

  const renderMessage = () =>
    state.message && (
      <p
        className={`mt-4 text-center text-sm ${
          state.message.includes("✅") ? "text-green-500" : "text-red-500"
        }`}
      >
        {state.message}
      </p>
    );

  const renderLoadingSpinner = () => (
    <div className="flex justify-center">
      <svg
        className="size-6 animate-spin text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v1m0 14v1m8-7h1m-14 0H3m14.071 7.071a9.042 9.042 0 001.424-1.424M4.929 6.929A9.042 9.042 0 006.353 5.5m13.838 0a9.042 9.042 0 01-1.424 1.429m-13.838 0a9.042 9.042 0 011.424-1.429"
        />
      </svg>
    </div>
  );

  return (
    <div className="mx-auto max-w-sm text-center">
      <form>
        <p className="text-md py-3 text-center text-gray-500">
          Please enter the 4-digit code we sent via SMS.
        </p>

        {/* Render Otp Inputs */}
        {renderOtpInputs()}

        {/* Render success or error messages */}
        {renderMessage()}

        {mobileNumber && state.canVerifyOtp && !state.hasError && (
          <div className="mt-4 text-center">
            {state.loading ? (
              renderLoadingSpinner()
            ) : (
              <OtpTimer reSendOtp={reSendOtp} verifyOtp={verifyOtp} />
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default memo(OtpValidation);
