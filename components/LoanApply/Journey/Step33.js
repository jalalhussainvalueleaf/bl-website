"use client";

import React, { useState } from "react";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";
import CalendarInput from "@/components/Common/CalendarInput";

const FirstStep = () => {
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

  const handleChange = (field) => (e) => {
    setValue(field, e.target.value);
    trigger(field);
  };
  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };
  const handleDateChange = (field, date) => {
    setValue(field, date);
    trigger(field);
    console.log("date", date);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-10 bg-white py-12">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-2xl font-bold">
            Enter Your Personal Details
          </h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-5 py-4">
              <CalendarInput
                label="Date Of Birth"
                value={watch("dob") || null}
                onDateChange={(date) => {
                  handleDateChange("dob", date);
                }}
                error={errors.dob?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="Gender"
                options={["Male", "Female", "Others"]}
                selected={watch("gender") || ""}
                onChange={(value) => handleDropdownChange("gender", value)}
                error={errors.gender?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="Highest Qualification"
                options={[
                  "Under Graduate",
                  "Graduate",
                  "Post Graduate",
                  "Others",
                ]}
                selected={watch("qualification") || ""}
                onChange={(value) =>
                  handleDropdownChange("qualification", value)
                }
                error={errors.qualification?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Pan Card"
                value={watch("panCard") || ""}
                onChange={handleChange("panCard")}
                error={errors.panCard?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 ">
              <Input
                type="text"
                placeholder="First Name"
                value={watch("fname") || ""}
                onChange={handleChange("fname")}
                error={errors.fname?.message}
              />
            </div>

            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Last Name"
                value={watch("lname") || ""}
                onChange={handleChange("lname")}
                error={errors.lname?.message}
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
