"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import { useUserContext } from "../../../utils/UserContext";
import { encryptData, decryptData } from "@/utils/cryptoUtils"; // Import the functions
import { userSearch,checkEmailDelivery,partialSubmit } from "@/api/user";

const SecondStep = ({ onClick }) => {
  const router = useRouter();
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const { setSteps } = useUserContext();
  const [emailConfidence, setEmailConfidence] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [userId, setUserId] = useState("");
  const [mobile, setUserMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const[userType,setUserType] = useState("");

  const fields = ["loan_amount", "email"];
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  // Load saved user data
  useEffect(() => {
    const saved_token = sessionStorage.getItem("_token");
    const saved_mobile = sessionStorage.getItem("mobileNumber");
    const amountData = sessionStorage.getItem("welcome");
    if (amountData) {
      const amountObject = JSON.parse(amountData);
      setAmount(amountObject.loan_amount || ""); // Initialize state with loan_amount
    }
    // console.log("amount", saved_amount);
    verifyUsers(saved_token, saved_mobile);
  }, []);

  // Verify Users function
  const verifyUsers = async (userToken, saved_mobile) => {
    if (!userToken) {
      console.error("User token is undefined.");
      setMessage("❌ User token is not available.");
      router.push("/apply-loan-online/");
      return;
    }

    // Construct the payload
    const payload = new URLSearchParams({
      mobile_no: saved_mobile ? saved_mobile : "",
      platform: "",
      utm: "",
      utm_source: "",
      utm: "",
      user_token: userToken, // Use userToken from state
    });

    // console.log("Payload being Verification:", payload.toString());

    try {
    const response = await userSearch(payload);
     const responseData = decryptData(response.data.encryptData); // Parse response as JSON
      // console.log("user search", responseData);
      const userData = responseData
        ? responseData
        : null;
      if (userData?.HTTPStatus === 200 && userData.status === "success") {
        setUserType(userData.user_type)
        setUserId(userData.user[0].id);
        setUserMobile(userData.user[0].mobile);
        Object.keys(userData.user[0]).forEach((field) => {
          setValue(field, userData.user[0][field]);
        });
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setMessage("❌ Error verifying user. Please try again later.");
    }
  };

  

  // Handle email input change and validation
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValue(field, value);
    if (field === "email") {
      setEmailError(""); // Reset error
      setEmailConfidence(null); // Reset confidence status
      trigger("email").then((valid) => {
        if (valid) {
          verifyEmail(value, mobile, userId);
        }
      });
    } else {
      trigger(field);
    }

    if (field === "loan_amount") {
      // Update the amount in state and session storage
      setAmount(value);
      const savedData = sessionStorage.getItem("welcome");
      const updatedData = savedData
        ? { ...JSON.parse(savedData), loan_amount: value }
        : { loan_amount: value };
      sessionStorage.setItem("welcome", JSON.stringify(updatedData));
    }
  };

  // Email verification API call
  const verifyEmail = async (email, mobile, userId) => {
    if (!email) return;
    const payload = new URLSearchParams({ email, mobile, user_id: userId });

    try {
      const response = await checkEmailDelivery(payload);
      const responseText = response.data; // Get raw response
      console.log("Raw Response:", responseText);
    } catch (error) {
      console.error("Error verifying email:", error);
      setEmailError("❌ Error verifying email. Please try again later.");
    }
  };

  // Form submission

  const onSubmit = async (data) => {
    const payload = new URLSearchParams({
      mobile_no: mobile,
      coloumn_name: "email",
      coloumn_value: data.email,
    });

    try {

      
      console.log(userType)
      if(userType === "0"){  
        setMessage("✅ Data saved successfully."); 
        sessionStorage.setItem("journey", 2);
        setSteps(2);
        }
        else{
          const response = await partialSubmit(payload);
          console.log(response)
          console.log(response.data.msg)
          sessionStorage.setItem("journey", 2);
          setSteps(2);
          setMessage("✅ Data saved successfully1.");  
        }
      
         } catch (error) {
      console.error("Form submission error:", error);
      setMessage(`❌ Form submission error: ${error.message}`);
     }

    }


  const handleRadioChange = (value) => {
    setSelectedLoanType(value);
  };

  return (
    <div className="mx-auto max-w-md px-5">
      <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
        What Is Your Email?
      </h2>
      <div className=" p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Input
            type="text"
            placeholder="Loan Amount"
            value={watch("loan_amount") || amount}
            onChange={handleChange("loan_amount")}
            error={errors.loan_amount?.message}
          />
          <Input
            type="text"
            placeholder="Personal Email Address"
            value={watch("email") || ""}
            onChange={handleChange("email")}
            error={errors.email?.message || emailError}
          />
          {emailConfidence && (
            <p className="text-sm text-green-500">
              Email delivery confidence: {emailConfidence}
            </p>
          )}
          {message && (
            <p
              // className={`mt-4 text-sm ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}
              className={`text-sm ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}
            >
              {message}
            </p>
          )}
          <Button btnName="Proceed" isLoading={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default SecondStep;
