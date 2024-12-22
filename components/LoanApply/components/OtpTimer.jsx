import React, { useEffect, useRef, useState } from "react";

const OtpTimer = ({ reSendOtp, verifyOtp }) => {
  const timerRef = useRef(null);
  const displayRef = useRef(null);
  const intervalRef = useRef(null);
  const initialTimerDuration = 30;
  const [isResendVisible, setIsResendVisible] = useState(false);

  const startTimer = (duration) => {
    clearInterval(intervalRef.current); // Clear any existing interval
    timerRef.current = duration;
    setIsResendVisible(false); // Hide the "Resend OTP" button

    if (displayRef.current) {
      displayRef.current.textContent = `Resend OTP in ${timerRef.current} seconds`;
    }

    intervalRef.current = setInterval(() => {
      timerRef.current -= 1;

      if (displayRef.current) {
        displayRef.current.textContent = `Resend OTP in ${timerRef.current} seconds`;
      }

      if (timerRef.current <= 0) {
        clearInterval(intervalRef.current);
        setIsResendVisible(true); // Show the "Resend OTP" button when timer ends
      }
    }, 1000);
  };

  useEffect(() => {
    const now = Date.now();
    const storedStartTime = sessionStorage.getItem("otpTimerStart");
    let remainingTime = initialTimerDuration;

    // Calculate remaining time if a previous start time exists
    if (storedStartTime) {
      const elapsed = Math.floor((now - parseInt(storedStartTime, 10)) / 1000);
      remainingTime = Math.max(initialTimerDuration - elapsed, 0);
    }

    if (remainingTime > 0) {
      startTimer(remainingTime); // Start the timer with remaining time
    } else {
      setIsResendVisible(true); // Show the "Resend OTP" button if timer already ended
    }

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (verifyOtp === true) {
      // start the timer
      const now = Date.now();
      sessionStorage.setItem("otpTimerStart", now.toString());
      startTimer(initialTimerDuration); // Start a fresh timer
    }
  }, [verifyOtp]);

  const handleResendOtp = () => {
    // Reset the timer
    const now = Date.now();
    sessionStorage.setItem("otpTimerStart", now.toString());
    startTimer(initialTimerDuration); // Start a fresh timer

    // Call resend otp api function
    reSendOtp();
  };

  return (
    <div>
      {!isResendVisible && (
        <p
          className="text-md text-gray-500"
          ref={displayRef} // Attach the ref to this DOM element
        >
          Resend OTP in {initialTimerDuration} seconds
        </p>
      )}

      {isResendVisible && (
        <button
          type="button"
          onClick={handleResendOtp} // Trigger the resend OTP logic
          className="w-full rounded-lg px-4 py-2 text-sm text-blue-500"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OtpTimer;
