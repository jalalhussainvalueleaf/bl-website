"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import { useUserContext } from "../../../utils/UserContext";
import { encryptData, decryptData } from "@/utils/cryptoUtils"; // Import the functions

const SecondStep = ({ onClick }) => {
  const router = useRouter();
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const { setSteps } = useUserContext();
  const [emailConfidence, setEmailConfidence] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [userId, setUserId] = useState("");
  const [mobile, setUserMobile] = useState("");
  const [message, setMessage] = useState("");

  const checkEmailDelivery =
    "https://prod.utils.buddyloan.in/email_validate.php";
  const partialSubmit = "https://prod.utils.buddyloan.in/update_user_temp.php";
  const checkUsers = "https://prod.utils.buddyloan.in/user_search.php";

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
    console.log("token", saved_token);
    verifyUsers(saved_token);
  }, []);

  // Verify Users function
  const verifyUsers = async (userToken) => {
    if (!userToken) {
      console.error("User token is undefined.");
      setMessage("❌ User token is not available.");
      router.push("/apply-loan-online/");
      return;
    }

    // Construct the payload
    const payload = new URLSearchParams({
      mobile_no: "",
      platform: "",
      utm: "",
      utm_source: "",
      utm: "",
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
      console.log("user search", decryptData(responseData.encryptData));
      const userData = responseData.encryptData
        ? decryptData(responseData.encryptData)
        : null;
      if (userData?.HTTPStatus === 200 && userData.status === "success") {
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
  };

  // Email verification API call
  const verifyEmail = async (email, mobile, userId) => {
    if (!email) return;
    const payload = new URLSearchParams({ email, mobile, user_id: userId });

    try {
      const response = await fetch(checkEmailDelivery, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: payload.toString(),
      });

      const responseText = await response.text(); // Get raw response
      console.log("Raw Response:", responseText);

      // const responseData = await response.json();
      // if (response.ok) {
      //   sessionStorage.setItem("email_delivery", JSON.stringify(responseData));
      //   setEmailConfidence(responseData.confidence || "High");
      // } else {
      //   setEmailError("Unable to verify email delivery confidence.");
      // }
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
      const response = await fetch(partialSubmit, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: payload,
      });

      // Check if the response was successful
      if (!response.ok) {
        console.error("HTTP Error:", response.status, response.statusText);
        setMessage(`❌ HTTP Error: ${response.status}`);
        return;
      }

      const responseText = await response.text(); // Get raw response
      console.log("Raw Response Text:", responseText);

      // Handle empty response bodies
      if (!responseText) {
        console.log("Empty response body.");
        setMessage("✅ Data saved successfully.");
        return;
      }

      try {
        const responseData = JSON.parse(responseText); // Parse JSON
        console.log("Parsed Response:", responseData);

        setMessage("✅ Data saved successfully.");
        sessionStorage.setItem("welcome", JSON.stringify(data));
      } catch (error) {
        console.error("JSON Parsing Error:", error.message);
        setMessage("❌ Server returned an invalid JSON response.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage(`❌ Form submission error: ${error.message}`);
    }
  };

  // const onSubmit = async (data) => {
  //   // const payload = new URLSearchParams({
  //   //   mobile_no: mobile,
  //   //   coloumn_name: "email",
  //   //   coloumn_value: data.email,
  //   // });
  //   // const response = await fetch(partialSubmit, {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   //   },
  //   //   body: payload,
  //   // });
  //   // const responseData = await response.json();
  //   // if (response.ok) {
  //   //   setMessage("✅ Data saved successfully.");
  //   //   sessionStorage.setItem("welcome", JSON.stringify(data));
  //   // } else {
  //   //   setMessage("❌ Failed to save data. Please try again.");
  //   // }
  //   // console.log("Response Data:", responseData);
  //   // try {
  //   const payload = new URLSearchParams({
  //     mobile_no: mobile,
  //     coloumn_name: "email",
  //     coloumn_value: data.email,
  //   });

  //   const response = await fetch(partialSubmit, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //     },
  //     body: payload,
  //   });
  //   const responseText = await response.text(); // Get raw response
  //   // console.log(await response.json());
  //   //const responseData = await response.json();
  //   console.log("ok");
  //   // if (response.ok) {
  //   //   setMessage("✅ Data saved successfully.");
  //   //   sessionStorage.setItem("welcome", JSON.stringify(data));
  //   // } else {
  //   //   setMessage("❌ Failed to save data. Please try again.");
  //   // }
  //   // } catch (error) {
  //   //   setMessage("❌ Form submission error. Please try again later.");
  //   //   console.error("Form submission error:", error);
  //   // }
  // };

  // Handle loan type radio selection
  const handleRadioChange = (value) => {
    setSelectedLoanType(value);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-md px-5">
        <h2 className="py-8 text-2xl font-bold">What Is Your Email?</h2>
        <div className="rounded-lg border p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Loan Amount"
              value={watch("loan_amount") || ""}
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
                className={`mt-4 text-sm ${message.includes("✅") ? "text-green-500" : "text-red-500"}`}
              >
                {message}
              </p>
            )}
            <Button btnName="Proceed" isLoading={isSubmitting} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
