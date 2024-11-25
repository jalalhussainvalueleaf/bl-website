"use client";
import React, { useEffect, useState } from "react";
import OtpVarifcation from "../../components/LoanApply/OtpVarification";
import { FaPencilAlt } from "react-icons/fa";

export default function MobileValidation({
  utmSource,
  utmMedium,
  utmCampaign,
  platform,
}) {
  const [mobile, setMobile] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  // OTP API URL
  const otpSendUrl = "https://prod.utils.buddyloan.in/v2/sendsms_v2.php";

  // List of invalid mobile numbers
  const invalidNumbers = [
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

  // Load saved mobile number from sessionStorage
  useEffect(() => {
    const savedMobile = sessionStorage.getItem("mobileNumber");
    if (savedMobile) {
      setMobile(savedMobile);
      setIsEditable(false);
      setShowOtpInput(true);
    }
  }, []);

  // Handle input change for mobile number
  const handleInputChange = (e) => {
    const value = e.target.value;
    setMobile(value);

    if (value.length === 10) {
      if (!invalidNumbers.includes(value) && /^[6-9]\d{9}$/.test(value)) {
        setIsValid(true);
        setShowOtpInput(true); // Show OTP input if valid
        setIsEditable(false); // Make mobile field read-only
        sendOtp(value); // Send OTP request
        sessionStorage.setItem("mobileNumber", value); // Save to sessionStorage
      } else {
        setIsValid(false);
        setShowOtpInput(false); // Hide OTP input if invalid
      }
    } else {
      setIsValid(true);
      setShowOtpInput(false); // Hide OTP input for incomplete numbers
    }
  };

  // Function to send OTP request
  const sendOtp = async (mobile) => {
    // Create the URL-encoded payload
    const payload = new URLSearchParams({
      mobile: mobile,
      utm: "homepgbanappnowbtn",
      platform: "Nweb",
    });

    try {
      const response = await fetch(otpSendUrl, {
        method: "POST", // Send as POST request
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", // Set content type
        },
        body: payload.toString(), // Convert the payload to URL-encoded format
      });

      console.log("after otp response", response);

      if (response.ok) {
        console.log("OTP sent successfully");
      } else {
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Handle edit click to reset mobile number and OTP input
  const handleEditClick = () => {
    setIsEditable(true);
    setShowOtpInput(false); // Remove OTP input when editing mobile number
    sessionStorage.removeItem("mobileNumber"); // Clear saved mobile number
  };

  return (
    <div className="h-[90vh]">
      <div className="grid lg:grid-cols-2">
        <div className="bg-gray-200">hello</div>
        <div className="flex h-[90vh] flex-col items-center justify-center">
          <h1 className="py-12 text-3xl">
            Apply & Get Loan Approved Instantly
          </h1>
          <div className="w-6/12">
            <div className="relative mb-4 flex w-full items-center">
              <input
                type="text"
                className={`poppins h-[53px] w-full rounded-[12px] border-[1px] ${
                  isValid ? "border-[#47B6F2]" : "border-red-500"
                } px-3 text-black ${
                  !isEditable ? "cursor-not-allowed bg-gray-200" : ""
                } outline-none focus:ring-0`}
                placeholder=""
                value={mobile}
                onChange={isEditable ? handleInputChange : undefined}
                maxLength="10"
                readOnly={!isEditable}
              />
              {!isEditable && (
                <button
                  className="absolute right-3 text-gray-500 hover:text-black"
                  onClick={handleEditClick}
                >
                  <FaPencilAlt />
                </button>
              )}
              <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 transform rounded-full bg-white px-1 text-[#47B6F2]">
                Mobile Number
              </label>
            </div>
            {!isValid && (
              <p className="text-sm text-red-500">
                Please enter a valid mobile number.
              </p>
            )}
            {showOtpInput && (
              <div className="mt-4">
                <OtpVarifcation
                  utmSource={utmSource}
                  utmMedium={utmMedium}
                  utmCampaign={utmCampaign}
                  platform={platform}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
