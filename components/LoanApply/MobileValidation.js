"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OtpVarifcation from "../../components/LoanApply/OtpVarification";
import { FaPencilAlt } from "react-icons/fa";
import ConfigData from "@/config";
import CarouselSlider from "@/components/LoanApply/Slider";

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
  const [newVerifyOtp, setVerifyOtp] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // OTP API URL
  const otpSendUrl = `${ConfigData.domainAPI}/v2/sendsms_v2.php`;
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
    setErrorMessage("");
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
        setErrorMessage("Invalid mobile number.");
      }
    } else {
      setIsValid(true);
      setShowOtpInput(false); // Hide OTP input for incomplete numbers
    }
  };
  // Function to send OTP request
  const sendOtp = async (mobile) => {
    const payload = new URLSearchParams({
      mobile: mobile,
      utm: "homepgbanappnowbtn",
      platform: "Nweb",
    });
    try {
      const response = await fetch(otpSendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: payload.toString(),
      });
      const result = await response.json();
      if (!response.ok || result.status === "failure") {
        if (result.HTTPStatus === 405) {
          setErrorMessage("❌ OTP limit exceeded. Try again after 10 minutes.");
          setVerifyOtp(false);
          setIsValid(false);
        } else {
          setErrorMessage("Failed to send OTP. Please try again.");
          setVerifyOtp(true);
          setIsValid(false);
        }
        console.error("OTP API Error:", result.message || "Unknown error");
      } else {
        console.log("OTP sent successfully");
        setShowOtpInput(true);
        setVerifyOtp(true);
      }
    } catch (error) {
      setErrorMessage("Error sending OTP. Please try again.");
      console.error("Error sending OTP:", error);
      setIsValid(false);
    }
  };
  // Handle edit click to reset mobile number and OTP input
  const handleEditClick = () => {
    setIsEditable(true);
    setShowOtpInput(false); // Remove OTP input when editing mobile number
    sessionStorage.removeItem("mobileNumber"); // Clear saved mobile number
  };
  return (
    <div className="">
      <div className="grid lg:grid-cols-2">
        <CarouselSlider />
        {/* <div className="flex flex-col justify-between bg-blue-100"> */}
        {/* <Link href="/">
            <Image
              src="/images/buddyloan-logo.png"
              className="h-10 w-32"
              alt="Buddy Loan"
              width={100}
              height={200}
            />
          </Link> */}
        {/* <div className=""> */}
        {/* <Lottie data={groovyWalkAnimation} loop={true} /> */}
        {/* </div> */}
        {/* </div> */}
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
            <div className="relative mb-4 flex w-full items-center">
              <input
                type="text"
                className={`poppins h-[53px] w-full rounded-[12px] border ${
                  isValid ? "border-[#47B6F2]" : "border-red-500"
                } px-3 text-black ${
                  !isEditable ? "cursor-not-allowed bg-slate-200" : ""
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
              <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 rounded bg-slate-100 px-1 text-[#47B6F2]">
                Mobile Number
              </label>
            </div>
            <div className="leading-1">
              <small>
                By clicking &quot;Next,&quot; I confirm that this is my
                registered mobile number and authorize Buddy Loan to use it for
                communications related to my loan application, as per the Terms
                & Conditions and Privacy Policy.
              </small>
            </div>
            {!isValid && <p className="text-sm text-red-500">{errorMessage}</p>}
            {newVerifyOtp && showOtpInput && (
              <>
                <div className="mt-4">
                  <OtpVarifcation
                    utmSource={utmSource}
                    utmMedium={utmMedium}
                    utmCampaign={utmCampaign}
                    platform={platform}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
