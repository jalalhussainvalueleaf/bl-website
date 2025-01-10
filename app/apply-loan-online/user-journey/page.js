"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../../utils/UserContext";
import { userSearch } from "@/api/user";
import { decryptData, encryptData } from "@/utils/cryptoUtils";
import { decryptData64 } from "@/utils/cryptoUtils64";
import Loader from "@/components/Common/Loader";
import Step1 from "../../../components/LoanApply/Journey/YourEmail";
import Step2 from "../../../components/LoanApply/Journey/LoanType";
import Step3 from "../../../components/LoanApply/Journey/EmploymentType";
import Step31 from "../../../components/LoanApply/Journey/SalaryMode";
import Step32 from "../../../components/LoanApply/Journey/WorkDetails";
import Step33 from "../../../components/LoanApply/Journey/PersonalDetails";
import Step34 from "../../../components/LoanApply/Journey/CommunicationAddress";
import Step35 from "../../../components/LoanApply/Journey/IncomeBankDetails";
import BusinessProof from "../../../components/LoanApply/Journey/BusinessProof";
import BusinessDetails from "../../../components/LoanApply/Journey/BusinessDetails";
import ProfessionType from "../../../components/LoanApply/Journey/ProfessionType";

export default function Page() {
  const router = useRouter();
  const { steps } = useUserContext();
  const [countSteps, setCountSteps] = useState("1"); // Default to string
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");

  // UseEffect to handle initial state setup and sessionStorage
  useEffect(() => {
    const savedStep = sessionStorage.getItem("journey");
    const savedMobile = sessionStorage.getItem("mobileNumber");

    // Set the current step if saved in sessionStorage
    if (savedStep) {
      setCountSteps(savedStep);
    } else {
      // Redirect to home if no step is found
      router.push("/apply-loan-online/");
    }
  }, [steps]);

  // Listen for sessionStorage changes (e.g., updates from other tabs)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === sessionStorage && event.key === "journey") {
        const newStep = event.newValue;
        if (newStep) {
          setCountSteps(newStep); // Update countSteps on storage change
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fetch user data when mobile is available and decrypt it
  useEffect(() => {
    const fetchAndDecryptMobile = async () => {
      try {
        const savedMobile = sessionStorage.getItem("mobileNumber");
        if (savedMobile) {
          const decryptedMobile = await decryptData64(savedMobile);
          setMobileNumber(decryptedMobile);
          await verifyUser(decryptedMobile); // Verify the user
        }
      } catch (error) {
        console.error("Error decrypting mobile number:", error);
      }
    };

    fetchAndDecryptMobile();
  }, []);

  // Verify the user using the decrypted mobile number and token
  const verifyUser = async (decryptedMobile) => {
    const savedToken = sessionStorage.getItem("_token");
    if (!savedToken) {
      router.push("/apply-loan-online/");
      return;
    }

    try {
      const response = await userSearch(
        new URLSearchParams({
          mobile_no: decryptedMobile,
          user_token: savedToken,
        }),
      );
      const decryptedData = decryptData(response.data.encryptData);
      const user = decryptedData?.user[0];

      if (
        decryptedData?.HTTPStatus === 200 &&
        decryptedData.status === "success"
      ) {
        setUserData(user);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  // Verify if the user is logged in and has a token
  useEffect(() => {
    const savedToken = sessionStorage.getItem("_token");
    if (!savedToken) {
      router.push("/apply-loan-online");
    } else {
      setLoading(false); // Set loading to false once token is verified
    }
  }, []);

  // Helper function to render different steps based on `countSteps`
  const renderStep = () => {
    switch (countSteps) {
      case "2":
        return <Step2 />;
      case "personalLoan":
        return <Step3 />;
      case "businessLoan":
        return <BusinessProof />;
      case "yes":
        return <BusinessDetails />;
      case "no":
        return <ProfessionType />;
      case "Salaried":
        return <Step31 />;
      case "Self-Employed":
        return <ProfessionType />;
      case "SalaryInBank":
        return <Step32 />;
      case "personalDetails":
        return <Step33 />;
      case "Student":
        return <Step33 />;
      case "communicationAddress":
        return <Step34 />;
      case "finish":
        return <Step35 />;
      default:
        return <Step1 userData={userData} mobileNumber={mobileNumber} />;
    }
  };

  useEffect(() => {
    setLoading(true);
    // Encrypted userId
    if (userData) {
      let encryptedUserId = encryptData(userData?.id);
      // let decryptedUserId = decryptData("oYx2Clg+MJOaBq9v8lookw==");
      if (countSteps === "journeyCompleted") {
        window.location.href = `https://www.prod.buddyloan.com/thank-you/?userId=${encryptedUserId}`;
      }
      setLoading(false);
    }
  }, [countSteps, userData]);

  console.log("countSteps", countSteps);

  // Render Loader or the steps UI based on loading state
  return (
    <div className="min-h-screen bg-[url('/images/bg1.png')] bg-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col items-center pt-12">
            <img src="/images/buddyloan-logo.png" className="w-40" />
          </div>
          <div>{renderStep()}</div>
        </>
      )}
    </div>
  );
}
