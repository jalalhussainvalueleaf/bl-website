"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";

const FirstStep = () => {
  const { setSteps } = useUserContext();

  const fields = ["professionType"];
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  useEffect(() => {
    // Load saved data on mount
    const savedData = sessionStorage.getItem("professionType");
    console.log(savedData);
    if (savedData) {
      setValue("professionType", savedData);
    }
  }, [setValue]);

  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  const onSubmit = (data) => {
    try {
      // console.log("test", data);
      sessionStorage.setItem("professionType", data.professionType);
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
            What Is Your Profession Type?
          </h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="My Profession Is"
                options={[
                  "Select Option",
                  "Doctor",
                  "Small Business Owner",
                  "Driver / House Help",
                  "Daily Wage Employee",
                  "Electrician/Plumber/Skilled Worker",
                  "CA/CS/ICWA/CS",
                  "Architect/Interior Designer",
                  "Lawyer/Paralegal",
                  "Contractual Employees",
                  "Actor/Influencer/Director/Photographer/Media Industry",
                  "Blogger/Journalist",
                  "Freelancers",
                  "Delivery Executive",
                  "Insurance/Property Agent",
                  "Nutritionist/Health & Wellness Trainer",
                  "Teacher / Professor / Lecturer",
                  "Cook/Catering Business",
                  "Fashion / Textile Designer",
                  "Agriculturist",
                  "House Wife",
                  "Engineer",
                  "Others",
                ]}
                selected={watch("professionType") || ""}
                onChange={(value) =>
                  handleDropdownChange("professionType", value)
                }
                error={errors.professionType?.message}
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
