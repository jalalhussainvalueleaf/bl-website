"use client";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { resendOTP, userSearch, verifyOTP } from "@/api/user";
import { encryptData, decryptData } from "@/utils/cryptoUtils"; // Import the functions
import { useUserContext } from "@/utils/UserContext";

// Constants for OTP and timer
const TOTAL_OTP_DIGITS = 4;
const RESEND_TIMER_SECONDS = 30;

const OtpValidation = ({
  totalDigits = 4,
  utmSource,
  utmMedium,
  utmCampaign,
  platform,
}) => {
  const [otpValues, setOtpValues] = useState(Array(totalDigits).fill(""));
  const inputRefs = useRef([]);

  // Focus the first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const {
    userId,
    setUserId,
    startUserNewJourney,
    setStartUserNewJourney,
    showOfferPage,
    setShowOfferPage,
  } = useUserContext();

  const router = useRouter();

  // Local state for OTP verification and resend timer
  const [state, setState] = useState({
    loading: false,
    message: "",
    canVerifyOtp: true,
    timer: RESEND_TIMER_SECONDS,
  });
  const [userData, setUserData] = useState("");

  // Get mobile number from session storage
  const mobileNumber = sessionStorage.getItem("mobileNumber");

  // Handle timer countdown for OTP resend
  useEffect(() => {
    let interval;
    if (state.timer > 0 && state.canVerifyOtp) {
      interval = setInterval(() => {
        setState((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearInterval(interval); // Clear interval on unmount
  }, [state.timer, state.canVerifyOtp]);

  // Update message state with an icon based on success or failure
  const updateMessage = (text, isSuccess = false) => {
    const icon = isSuccess ? "✅" : "❌";
    setState((prev) => ({ ...prev, message: `${icon} ${text}` }));
  };

  // Handle OTP verification logic
  const handleOtpVerification = async (enteredOtp) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      // Prepare payload for OTP verification request
      const payload = new URLSearchParams({
        mobile_no: mobileNumber,
        mobile_otp: enteredOtp,
        platform,
        utm: utmMedium,
        utm_source: utmSource,
        user_consent: 2,
      });

      // Make OTP verification API call
      const response = await verifyOTP(payload);
      handleVerificationResponse(response?.data); // Handle response from API
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      updateMessage(errorMessage); // Show error message if request fails
      toast.error(errorMessage); //error toast
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Handle OTP verification response
  const handleVerificationResponse = (response) => {
    if (response?.status === "success" && response?.message === "OTP Match") {
      sessionStorage.setItem("_token", response.user_token);
      updateMessage(response.message, true);
      toast.success(response?.message); // sucess toast
      verifyUsers(response?.user_token);
      setUserData(response);
      return;
    }

    // Handle specific failure cases like OTP limit exceeded
    if (response?.status === "failure" && response?.HTTPStatus === 405) {
      updateMessage(response.message);
      toast.error(response?.message); // error toast
      setState((prev) => ({ ...prev, canVerifyOtp: false }));
      return;
    }

    updateMessage(`${response?.message}`);
    toast.error(response?.message); // error toast
  };

  // Handle OTP input change
  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input
    if (!/^[0-9]?$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move focus to the next input if value is entered
    if (value && index < totalDigits - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if OTP is complete
    if (newOtpValues.every((digit) => digit !== "")) {
      const enteredOtp = newOtpValues.join("");
      handleOtpVerification(enteredOtp);
    }
  };

  // Handle key events (e.g., Backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Resend OTP handler
  const reSendOtp = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      timer: RESEND_TIMER_SECONDS,
    }));

    try {
      // Prepare payload for OTP verification request
      const payload = new URLSearchParams({
        mobile: mobileNumber,
        utm: "homepgbanappnowbtn",
        platform: "Nweb",
      });

      // Make OTP verification API call
      const response = await resendOTP(payload);
      if (response.data === "failure") {
        updateMessage(response.data.message, false);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      updateMessage(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Verify Users function
  const verifyUsers = async (userToken) => {
    if (!userToken) {
      updateMessage("User token is not available.", false);
      return;
    }

    try {
      // Construct the payload
      const payload = new URLSearchParams({
        mobile_no: mobileNumber,
        platform: platform,
        utm: utmMedium,
        utm_source: utmSource,
        user_token: userToken,
      });

      // Make OTP verification API call
      const res = await userSearch(payload);

      // decrypting the res here
      const response = decryptData(res?.data?.encryptData);

      if (response.status === "failure") {
        updateMessage(
          response.message ?? "In user search an unexpected error occurred.",
          false,
        );
      }

      sessionStorage.setItem("journey", 1);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "In user search an unexpected error occurred.";
      updateMessage(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    // Exit early if userData is empty or undefined
    if (!userData || userData === "") return;

    if (userData && userData.loan_status_30 === 0) {
      // here user can take new journey
      setUserId(userData.id);
      setStartUserNewJourney(true);
      setShowOfferPage(false);
      const data = {
        userId: userData.id,
        StartUserNewJourney: startUserNewJourney,
        ShowOfferPage: showOfferPage,
      };
      // Store the JSON data in sessionStorage
      sessionStorage.setItem("u_stat_bdl", JSON.stringify(data));

      router.push("/apply-loan-online/user-journey");
    } else {
      setUserId(userData.id);
      setStartUserNewJourney(false);
      setShowOfferPage(true);
      const data = {
        userId: userData.id,
        StartUserNewJourney: startUserNewJourney,
        ShowOfferPage: showOfferPage,
      };

      // Store the JSON data in sessionStorage
      const userStat = encryptData(data);
      sessionStorage.setItem("u_stat_bdl", userStat);

      // loan_status_30 = 1 redirect to offer page
      router.push("/apply-loan-online/user-status");
    }
  }, [userData]);

  return (
    <div className="mx-auto max-w-sm text-center">
      <form>
        {/* Instructions for user */}
        <p className="text-md py-3 text-center text-gray-500">
          Please enter the 4-digit code we sent via SMS.
        </p>

        {/* Otp Inputs */}
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
              // onPaste={handlePaste}
              className="block size-12 rounded-lg border border-gray-300 text-center text-sm font-extrabold focus:border-bl-blue focus:ring-2 focus:ring-bl-blue"
            />
          ))}
        </div>

        {/* Display OTP verification message */}
        {state.message && (
          <p
            className={`mt-4 text-center text-sm ${
              state.message.includes("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}

        {/* OTP resend button or timer */}
        {mobileNumber && state.canVerifyOtp && (
          <div className="mt-4 text-center">
            {state.loading ? (
              // Loading spinner while waiting for OTP verification
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
            ) : state.timer > 0 ? (
              // Show countdown timer if OTP resend is available
              <p className="text-md text-gray-500">
                Resend OTP in {state.timer} seconds
              </p>
            ) : (
              // Resend OTP button when timer expires
              <button
                type="button"
                onClick={reSendOtp}
                className="w-full rounded-lg px-4 text-sm text-blue-500"
              >
                Resend OTP
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default OtpValidation;
