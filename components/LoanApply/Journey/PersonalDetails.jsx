"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";
import CalendarInput from "@/components/Common/CalendarInput";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { debounce } from "lodash";
import BackButton from "@/components/Common/BackButton";

const Step33 = () => {
  const { setSteps, userSearchData, setUserSearchData } = useUserContext();
  const [isPanVisible, setIsPanVisible] = useState(false); // State to toggle visibility
  const handlePanVisibilityToggle = () => {
    setIsPanVisible((prevState) => !prevState); // Toggle the state
  };

  const fields = ["dob", "gender", "qualifications", "pan", "fname", "lname"];
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();

  const handleDateChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  const handleInputChange = useCallback(
    (field) => (event) => {
      const { value } = event.target;
      setValue(field, value);
      trigger(field);
    },
    [setValue, userSearchData],
  );

  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  const onSubmit = async (data) => {
    try {
      // Update only the fields that are present in `data`
      const updatedUserSearchData = { ...userSearchData };
      Object.keys(data).forEach((key) => {
        if (key in updatedUserSearchData) {
          updatedUserSearchData[key] = data[key];
        }
      });

      // Set the updated data to state
      setUserSearchData(updatedUserSearchData);
      sessionStorage.setItem("personalDetails", JSON.stringify(data));
      sessionStorage.setItem("journey", "communicationAddress");
      setSteps("communicationAddress"); // Navigate to the next step
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  function handleBack() {
    sessionStorage.setItem("journey", "SalaryInBank");
    setSteps("SalaryInBank");
  }

  useEffect(() => {
    if (userSearchData) {
      // Destructure fields from userSearchData
      const { gender, qualifications, dob } = userSearchData;

      if (dob) {
        const parsedDate = new Date(dob);
        setValue("dob", parsedDate);
      }

      if (gender == "MALE") {
        setValue("gender", "Male");
      } else if (gender == "FEMALE") {
        setValue("gender", "Female");
      } else if (gender == "OTHERS") {
        setValue("gender", "Others");
      } else {
        setValue("gender", gender);
      }

      if (qualifications == "1") {
        setValue("qualifications", "Under Graduate");
      } else if (qualifications == "2") {
        setValue("qualifications", "Graduate");
      } else if (qualifications == "3") {
        setValue("qualifications", "Post Graduate");
      } else {
        setValue("qualifications", qualifications);
      }

      // Iterate through the fields and set their values
      ["pan", "fname", "lname"].forEach((field) => {
        setValue(field, userSearchData[field]);
      });
    }
  }, []);

  return (
    <div className="">
      <div className="mx-auto max-w-md px-5">
        <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
          Enter Your Personal Details
        </h2>
      </div>
      <div className="mx-auto max-w-md px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <CalendarInput
              label="Date of Birth"
              value={watch("dob")}
              onDateChange={(date) => {
                handleDateChange("dob", date);
              }}
              error={errors.dob?.message}
            />
          </div>
          <div className="py-4">
            <Dropdown
              label="Gender"
              options={["Male", "Female", "Others"]}
              selected={watch("gender") || ""}
              onChange={(value) => handleDropdownChange("gender", value)}
              error={errors.gender?.message}
            />
          </div>
          <div className="py-4">
            <Dropdown
              label="Highest Qualification"
              options={["Under Graduate", "Graduate", "Post Graduate"]}
              selected={watch("qualifications") || ""}
              onChange={(value) =>
                handleDropdownChange("qualifications", value)
              }
              error={errors.qualifications?.message}
            />
          </div>
          <div className="relative py-4">
            <Input
              type={isPanVisible ? "text" : "password"}
              placeholder="Pan Card"
              value={watch("pan") || ""}
              onChange={handleInputChange("pan")}
              error={errors.pan?.message}
              maxLength={10}
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
              value={watch("fname") || ""}
              onChange={handleInputChange("fname")}
              error={errors.fname?.message}
            />
          </div>
          <div className="py-4">
            <Input
              type="text"
              placeholder="Last Name"
              value={watch("lname") || ""}
              onChange={handleInputChange("lname")}
              error={errors.lname?.message}
            />
          </div>

          <div className="my-4 mb-6 flex items-center justify-center gap-5">
            <BackButton backTo={"SalaryInBank"} />
            <Button
              btnName="Proceed"
              isLoading={isSubmitting}
              isDisabled={isSubmitting} // Disable button when submitting
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step33;
