"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";

const FirstStep = () => {
  const { setSteps } = useUserContext();
  const checkPincodeAPI =
    "https://prod.utils.buddyloan.in/autopopulate_pincode_api.php";

  const fields = ["residenceType", "currentAddress", "pincode"];

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();

  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedData =
      JSON.parse(sessionStorage.getItem("communicationAddress")) || {};
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

  const handleChange = (field) => async (e) => {
    const value = e.target.value;
    setValue(field, value);

    if (field === "pincode") {
      await validatePincode(value);
    }
  };

  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  const onSubmit = async (data) => {
    try {
      // Ensure all validations are triggered
      const isValid = await trigger();
      const pincodeValid = await validatePincode(data.pincode);
      if (!isValid || !pincodeValid) {
        setPincodeError("Please fix the errors before proceeding.");
        return;
      }
      console.log("Form data before saving to sessionStorage:", data);
      sessionStorage.setItem("communicationAddress", JSON.stringify(data));
      sessionStorage.setItem("journey", "finish");
      setSteps("finish");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className=" bg-white">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-2xl font-bold">
            Enter Communication Address
          </h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="Residence Type"
                options={[
                  "Self Owned",
                  "Owned By Parents",
                  "Owned By Siblings",
                  "Rented",
                ]}
                selected={watch("residenceType") || ""}
                onChange={(value) =>
                  handleDropdownChange("residenceType", value)
                }
                error={errors.residenceType?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="No. of Years Living in Current Address"
                options={[
                  "0 - 3 Months",
                  "3 - 6 Months",
                  "6 Months - 1 Year",
                  "1 - 2 Years",
                  "2 + Years",
                ]}
                selected={watch("currentAddress") || ""}
                onChange={(value) =>
                  handleDropdownChange("currentAddress", value)
                }
                error={errors.currentAddress?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Current Address Pincode"
                value={watch("pincode") || ""}
                onChange={handleChange("pincode")}
                error={errors.pincode?.message || pincodeError}
              />
            </div>

            <Button btnName="Proceed" isDisabled={!isPincodeValid} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
