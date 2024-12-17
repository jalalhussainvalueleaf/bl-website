"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";

const FirstStep = () => {
  const [workDetails, setWorkDetails] = useState("");
  const { setSteps } = useUserContext();
  const checkPincodeAPI =
    "https://prod.utils.buddyloan.in/autopopulate_pincode_api.php";

  const fields = ["companyType", "companyName", "pincode", "years", "business"];

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(false);

  const handleChange = (field) => async (e) => {
    const value = e.target.value;
    setValue(field, value);
    // trigger(field);
    if (field === "pincode") {
      await validatePincode(value);
    }
  };
  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  // Load saved data on mount
  useEffect(() => {
    const savedData =
      JSON.parse(sessionStorage.getItem("businessDetails")) || {};
    Object.keys(savedData).forEach((field) => {
      setValue(field, savedData[field]);
    });
  }, [setValue]);

  const validatePincode = async (pincode) => {
    if (pincode.length !== 6) {
      setIsPincodeValid(false);
      setPincodeError("Pincode must be 6 digits.");
      return false;
    }

    const payload = new URLSearchParams({ pincode });
    try {
      const response = await fetch(checkPincodeAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: payload.toString(),
      });

      const result = await response.json();
      if (response.ok && result.HTTPStatus === 200) {
        setIsPincodeValid(true);
        setPincodeError("");
        return true;
      } else {
        setIsPincodeValid(false);
        setPincodeError(result.message || "Invalid pincode.");
        return false;
      }
    } catch (error) {
      setIsPincodeValid(false);
      setPincodeError("Error validating pincode. Please try again.");
      console.error("Pincode validation error:", error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    try {
      const finalData = { ...data, workDetails: workDetails };
      sessionStorage.setItem("businessDetails", JSON.stringify(formData));
      sessionStorage.setItem("journey", "personalDetails");
      setSteps("personalDetails");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className=" bg-white">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-2xl font-bold">
            Enter Your Business Details
          </h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="Company Type"
                options={[
                  "Private Sector",
                  "Public Sector",
                  "Government",
                  "Proprietorship",
                  "Others",
                ]}
                selected={watch("companyType") || ""}
                onChange={(value) => handleDropdownChange("companyType", value)}
                error={errors.companyType?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Company Name"
                value={watch("companyName") || ""}
                onChange={handleChange("companyName")}
                error={errors.companyName?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 ">
              <Input
                type="text"
                placeholder="Pincode"
                value={watch("pincode") || ""}
                onChange={handleChange("pincode")}
                error={errors.pincode?.message || pincodeError}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="No. Of Years In Business"
                options={[
                  "Select Option",
                  "0 - 3 Months",
                  "3 - 6 Months",
                  "6 Months - 1 Year",
                  "1 - 2 Years",
                  "2 + Years",
                ]}
                selected={watch("years") || ""}
                onChange={(value) => handleDropdownChange("years", value)}
                error={errors.currentCompany?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="Nature Of Business"
                options={[
                  "Select Option",
                  "Trader/Wholeseller",
                  "Manufacturer",
                  "Retailer",
                  "Service Provider & Others",
                ]}
                selected={watch("business") || ""}
                onChange={(value) => handleDropdownChange("business", value)}
                error={errors.currentCompany?.message}
              />
            </div>
            <Button btnName="Proceed" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
