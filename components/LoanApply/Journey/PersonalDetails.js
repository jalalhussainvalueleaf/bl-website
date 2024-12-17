"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";
import CalendarInput from "@/components/Common/CalendarInput";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const FirstStep = () => {
  const { setSteps } = useUserContext();
  const [isPanVisible, setIsPanVisible] = useState(false); // State to toggle visibility
  const handlePanVisibilityToggle = () => {
    setIsPanVisible((prevState) => !prevState); // Toggle the state
  };

  const fields = [
    "dob",
    "gender",
    "qualification",
    "panCard",
    "fname",
    "lname",
  ];
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();

  // Load saved data on mount
  useEffect(() => {
    const savedData =
      JSON.parse(sessionStorage.getItem("personalDetails")) || {};
    console.log("Saved data from sessionStorage:", savedData);

    Object.keys(savedData).forEach((field) => {
      let value = savedData[field];
      if (field === "dob" && value) {
        const parsedDate = new Date(value);
        // console.log("Parsed date:", parsedDate);

        if (!isNaN(parsedDate.getTime())) {
          setValue(field, parsedDate);
        } else {
          console.error("Invalid date format in session storage");
        }
      } else {
        setValue(field, value);
      }
    });
  }, [setValue]);

  const handleFieldChange = (field, value) => {
    setValue(field, value);
    trigger(field); // Validate the field on change
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form data before saving to sessionStorage:", data);
      sessionStorage.setItem("personalDetails", JSON.stringify(data));
      sessionStorage.setItem("journey", "communicationAddress");
      setSteps("communicationAddress"); // Navigate to the next step
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Check if the date is valid and log it
  let dobDate = null;
  if (formData.dob) {
    if (formData.dob instanceof Date) {
      dobDate = formData.dob;
    } else if (typeof formData.dob === "string") {
      dobDate = new Date(formData.dob);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-md px-5">
        <h2 className="py-8 text-center text-2xl font-bold">
          Enter Your Personal Details
        </h2>
      </div>
      <div className="mx-auto max-w-md rounded-lg border px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <CalendarInput
              label="Date Of Birth"
              selectedDates={dobDate || ""}
              onDateChange={(date) => {
                console.log("Date picked in CalendarInput:", date);
                handleFieldChange("dob", date);
              }}
              error={errors.dob?.message}
            />
          </div>
          <div className="py-4">
            <Dropdown
              label="Gender"
              options={["Male", "Female", "Others"]}
              selected={formData.gender || ""}
              onChange={(value) => handleFieldChange("gender", value)}
              error={errors.gender?.message}
            />
          </div>
          <div className="py-4">
            <Dropdown
              label="Highest Qualification"
              options={[
                "Under Graduate",
                "Graduate",
                "Post Graduate",
                "Others",
              ]}
              selected={formData.qualification || ""}
              onChange={(value) => handleFieldChange("qualification", value)}
              error={errors.qualification?.message}
            />
          </div>
          <div className="relative py-4">
            <Input
              type={isPanVisible ? "text" : "password"}
              placeholder="Pan Card"
              value={formData.panCard || ""}
              onChange={(e) => {
                const uppercasedValue = e.target.value.toUpperCase(); // Auto-capitalize
                handleFieldChange("panCard", uppercasedValue);
              }}
              error={errors.panCard?.message}
            />
            <button
              type="button"
              onClick={handlePanVisibilityToggle}
              style={{
                position: "absolute",
                right: "10px",
                top: "43%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isPanVisible ? (
                <FaRegEye size={22} className="fill-bl-blue" />
              ) : (
                <FaRegEyeSlash size={22} className="fill-bl-blue" />
              )}
            </button>
            <small className="absolute top-[70%]">
              (in-case Incorrect PAN is Provided, Loan will be Rejected)
            </small>
          </div>
          <div className="py-4">
            <Input
              type="text"
              placeholder="First Name"
              value={formData.fname || ""}
              onChange={(e) => handleFieldChange("fname", e.target.value)}
              error={errors.fname?.message}
            />
          </div>
          <div className="py-4">
            <Input
              type="text"
              placeholder="Last Name"
              value={formData.lname || ""}
              onChange={(e) => handleFieldChange("lname", e.target.value)}
              error={errors.lname?.message}
            />
          </div>
          <Button
            btnName="Proceed"
            isLoading={isSubmitting}
            isDisabled={isSubmitting} // Disable button when submitting
          />
        </form>
      </div>
    </div>
  );
};

export default FirstStep;
