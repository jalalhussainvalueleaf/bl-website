"use client";
import React, { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import { useUserContext } from "../../utils/UserContext";
import { useRouter } from "next/navigation";
import { encryptData, decryptData } from "../../utils/cryptoUtils"; // Import the functions

export default function OtpVarification({
  utmSource,
  utmMedium,
  utmCampaign,
  platform,
}) {
  const {
    userId,
    setUserId,
    startUserNewJourney,
    setStartUserNewJourney,
    showOfferPage,
    setShowOfferPage,
  } = useUserContext();

  const router = useRouter();

  const inputRefs = useRef([]);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const mobileNumber = sessionStorage.getItem("mobileNumber");
  const [newVerifyOtp, setVerifyOtp] = useState(true);
  const [userToken, setUserToken] = useState();
  const [encryptedData, setEncyptionData] = useState("");
  const [userFinalData, setUserFinalData] = useState({});
  const [resendEnabled, setResendEnabled] = useState(false);

  const otpVerifyUrl = "https://prod.utils.buddyloan.in/verifynewotp.php";
  const resendOtpUrl = "https://prod.utils.buddyloan.in/Resend_otp.php";
  const checkUsers = "https://prod.utils.buddyloan.in/user_search.php";

  // Initialize timer from sessionStorage or set to 30 seconds
  useEffect(() => {
    if (mobileNumber) {
      const storedTime = sessionStorage.getItem("otpTimer");
      const now = Date.now();

      if (storedTime) {
        const remainingTime =
          30 - Math.floor((now - parseInt(storedTime, 10)) / 1000);
        if (remainingTime > 0) {
          setTimer(remainingTime);
        }
      }
    } else {
      setTimer(0); // Ensure timer is reset if mobile number is not found
    }
  }, [mobileNumber]);

  // Start or resume the countdown only if mobileNumber exists
  useEffect(() => {
    if (mobileNumber && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mobileNumber, timer]);

  // Update sessionStorage whenever the timer changes
  useEffect(() => {
    if (mobileNumber && timer > 0) {
      sessionStorage.setItem("otpTimer", Date.now().toString());
    } else {
      sessionStorage.removeItem("otpTimer");
    }
  }, [mobileNumber, timer]);

  // Function to resend the OTP
  const sendOtp = async () => {
    if (!mobileNumber) {
      setMessage("❌ Mobile number not found. Please try again.");
      return;
    }

    const payload = new URLSearchParams({
      mobile: mobileNumber,
      utm: "homepgbanappnowbtn",
      platform: "Nweb",
    });

    try {
      const response = await fetch(resendOtpUrl, {
        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: payload.toString(),
      });

      if (response.ok) {
        setMessage("✅ OTP sent successfully!");
        setTimer(30); // Reset the timer
      } else {
        setMessage("❌ Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Error sending OTP. Please try again later.");
      console.error("Error sending OTP:", error);
    }
  };

  // Handle OTP input
  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      e.target.value = ""; // Clear invalid input
      return;
    }

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (inputRefs.current.every((input) => input?.value)) {
      const enteredOtp = inputRefs.current.map((input) => input.value).join("");
      verifyOtp(enteredOtp, mobileNumber);
      // setVerifyOtp(enteredOtp);
    } else {
      setMessage(""); // Clear message if OTP is incomplete
    }
  };

  // Verify OTP function
  const verifyOtp = async (enteredOtp) => {
    if (!mobileNumber) {
      console.error("Mobile number not found.");
      setMessage("❌ Mobile number not found. Please try again.");
      return;
    }

    if (!enteredOtp) {
      console.error("Entered OTP is blank.");
      setMessage("❌ Please enter a valid OTP.");
      return;
    }
    // Set loading to true before API call
    setLoading(true);

    // Log values to debug
    // console.log("Entered OTP:", enteredOtp);
    // console.log("Mobile Number:", mobileNumber);

    // Construct the payload
    const payload = new URLSearchParams({
      mobile_no: mobileNumber,
      mobile_otp: enteredOtp, // Use the correct OTP value
      platform: platform,
      utm: utmMedium,
      utm_source: utmSource,
    });

    // console.log("Payload being sent:", payload.toString());

    try {
      const response = await fetch(otpVerifyUrl, {
        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: payload.toString(),
      });
      // console.log(body);
      const responseData = await response.json(); // Parse response as JSON
      console.log("otp encypted", responseData);
      console.log("hurray data here", decryptData(responseData.encryptData));
      // console.log("status", decryptData(responseData.encryptData));
      const decrptResponseData = decryptData(responseData.encryptData);
      // const decrptResponseData = responseData;
      // console.log("encyptedCustomData", decryptData(hUjVgE0Pn25MxHkifRepPugQCuPK4AGEEVigXPrFQ6ciWViVeeDUYf\/ZsulvT4Qs));
      if (
        decrptResponseData.status === "failure" &&
        decrptResponseData.HTTPStatus === 405
      ) {
        setMessage("❌ OTP limit exceed,try after 10 mins");
        setVerifyOtp(false);
      }
      if (
        decrptResponseData.status === "success" &&
        decrptResponseData.message === "OTP Match"
      ) {
        // const responseData = await response.json(); // Parse response as JSON
        // console.log("API Response:", responseData); // Log the full response
        // sessionStorage.setItem(
        //   "verificationData",
        //   JSON.stringify(responseData),
        // );
        // console.log("user_token", decrptResponseData.user_token);
        setUserToken(decrptResponseData.user_token);
        setMessage("✅ OTP verified successfully!");
        verifyUsers(decrptResponseData.user_token);
      } else {
        console.error("Error Response:", decrptResponseData.message);
        setMessage("❌ " + decrptResponseData.message + ". Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage(
        "❌ Error " + decrptResponseData.message + ". Please try again later.",
      );
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify Users function
  const verifyUsers = async (userToken) => {
    if (!userToken) {
      console.error("User token is undefined.");
      setMessage("❌ User token is not available.");
      return;
    }

    // Construct the payload
    const payload = new URLSearchParams({
      mobile_no: mobileNumber,
      platform: platform,
      utm: utmMedium,
      utm_source: utmSource,
      utm: utmMedium,
      user_token: userToken, // Use userToken from state
    });

    // console.log("Payload being Verification:", payload.toString());

    try {
      const response = await fetch(checkUsers, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: payload.toString(),
      });
      // console.log(body);
      const responseData = await response.json(); // Parse response as JSON
      // console.log("user search", responseData);
      // const user_data = decryptData(responseData.encryptData);
      sessionStorage.setItem("ud_token", responseData.encryptData);
      console.log("new user serach", decryptData(responseData.encryptData));
      setUserFinalData(decryptData(responseData.encryptData));
      // setEncyptionData(decryptData(responseData.encryptData));
    } catch (error) {
      console.error("Error verifying user:", error);
      setMessage("❌ Error verifying user. Please try again later.");
    }
  };

  // set the user id from the decypted data to check for the offers
  useEffect(() => {
    if (
      userFinalData &&
      userFinalData.user &&
      Array.isArray(userFinalData.user) &&
      userFinalData.user.length > 0
    ) {
      if (userFinalData.user[0].uj_status > 0) {
        // offer page
        console.log("Repeated journey", userFinalData.user[0].uj_status);
        setUserId(userFinalData.user[0].id);
        setStartUserNewJourney(false);
        setShowOfferPage(true);
        router.push("/apply-loan-online/user-status");
      } else {
        // new new for journey
        console.log("user journey", userFinalData.user[0].uj_status);
        setUserId(userFinalData.user[0].id);
        setStartUserNewJourney(true);
        setShowOfferPage(false);
        router.push("/apply-loan-online/user-journey");
      }
    }
  }, [userFinalData]);
  // console.log(
  //   "encyptedCustomData",
  //   decryptData(
  //     "N3SI6wQvA5I3Mg5gyn1B27WpB/da3+tq1hpm+rTsD+S/THvj/VX0Z8cOvHsQhilsHskvB4ijj+uMtqVndv+1l7Xgj9agp5gGRLvyQMWI5HvFsvMbBm2huU2y4/s3slYNzz/bt64Pvi/VM1OoOiWT8dj4Dgt4SBvBzAcHifUIu9Cn5q/vZ5wD2+Nfs/wYDJ9oVRHFB60UBueTr2Vr4A/nFQoaS3hefyulcA6q2zfzVnM=",
  //   ),
  // );

  return (
    <div>
      <form className="mx-auto max-w-sm">
        <p
          id="helper-text-explanation"
          className="py-2 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          Please enter the 4-digit code we sent via SMS.
        </p>
        <div className="mb-2 flex justify-center space-x-2 rtl:space-x-reverse">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <input
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="block size-12 rounded-lg border border-gray-300 text-center text-sm font-extrabold"
                required
              />
            </div>
          ))}
        </div>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* {timer > 0 ? (
          <p className="mt-4 text-center text-sm text-gray-500">
            Resend OTP in {timer} seconds
          </p>
        ) : (
          <button
            type="button"
            onClick={sendOtp}
            className="w-full rounded-lg px-4 text-sm text-blue-500"
          >
            Resend OTP
          </button>
        )} */}

        {mobileNumber ? (
          newVerifyOtp ? (
            <>
              {loading ? (
                <div className="mt-4 flex justify-center">
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
                    ></path>
                  </svg>
                </div>
              ) : timer > 0 ? (
                <p className="mt-4 text-center text-sm text-gray-500">
                  Resend OTP in {timer} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full rounded-lg px-4 text-sm text-blue-500"
                >
                  Resend OTP
                </button>
              )}
            </>
          ) : (
            ""
          )
        ) : null}
      </form>
      {/* if user doesnot exists in the table then start a new journey for testing */}
      {/* {startUserNewJourney && <>Journey Started for New User</>} */}

      {/* if user is already registered then show the offer page for testing */}
      {/* {showOfferPage && userId && userId.trim() !== "" && (
        <>Showing Offer Page</>
      )} */}
    </div>
  );
}
