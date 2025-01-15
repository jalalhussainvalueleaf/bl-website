"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../../utils/UserContext";
import { userSearch } from "@/api/user";
import { decryptData64 } from "@/utils/cryptoUtils64";
import Loader from "@/components/Common/Loader";
import {
  Step1,
  Step2,
  Step3,
  Step31,
  Step32,
  Step33,
  Step34,
  Step35,
  BusinessProof,
  BusinessDetails,
  ProfessionType,
} from "@/components/LoanApply/index";
import toast from "react-hot-toast";

const UserJounery = () => {
  const router = useRouter();
  const { steps, userSearchData, setUserSearchData, setMobileNumber } =
    useUserContext();
  const [countSteps, setCountSteps] = useState("start"); // Default to string
  const [loading, setLoading] = useState(true);

  // UseEffect to handle initial state setup and sessionStorage
  useEffect(() => {
    const savedStep = sessionStorage.getItem("journey");
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

  // Memoize verifyUser function
  const verifyUser = useCallback(async () => {
    const savedToken = sessionStorage.getItem("_token");
    if (!savedToken) {
      router.push("/apply-loan-online/");
      return;
    }

    try {
      const params = new URLSearchParams({
        user_token: savedToken,
      });

      const response = await userSearch(params);
      if (
        response?.data?.HTTPStatus === 200 &&
        response?.data?.status === "success"
      ) {
        setUserSearchData(response?.data?.user?.at(0));
      }

      if (response.data.status === "failure") {
        toast.error(
          response.data.message ?? CONSTANTS.MESSAGES.USER_SEARCH_ERROR,
        );
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  }, []);

  // Memoize decryptData64 function if it's defined in the component
  const decryptMobile = useCallback(async (savedMobile) => {
    try {
      return await decryptData64(savedMobile);
    } catch (error) {
      console.error("Error decrypting mobile:", error);
      return null;
    }
  }, []);

  // Use useCallback for the main fetch function
  const fetchAndDecryptMobile = useCallback(async () => {
    const savedMobile = sessionStorage.getItem("mobileNumber");
    if (!savedMobile) return;

    const decryptedMobile = await decryptMobile(savedMobile);
    if (decryptedMobile) {
      setMobileNumber(decryptedMobile);
      await verifyUser();
    }
  }, [decryptMobile, verifyUser]);

  // Optimize useEffect
  useEffect(() => {
    fetchAndDecryptMobile();
  }, []);

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
      case "loanType":
        return <Step2 userSearchData={userSearchData} />;
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
        return <Step1 userSearchData={userSearchData} />;
    }
  };

  if (loading) {
    return <Loader />;
  }

  // Render Loader or the steps UI based on loading state
  return (
    <div className="min-h-screen bg-[url('/images/bg1.png')] bg-center">
      <div className="flex flex-col items-center pt-12">
        <img src="/images/buddyloan-logo.png" className="w-40" />
      </div>
      <div>{renderStep()}</div>
    </div>
  );
};

export default UserJounery;
