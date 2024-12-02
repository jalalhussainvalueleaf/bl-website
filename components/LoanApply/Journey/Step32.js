"use client";

import React, { useState } from "react";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";

const FirstStep = () => {
  const fields = [
    "companyType",
    "companyName",
    "pincode",
    "years",
    "designation",
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
          <h2 className="py-8 text-2xl font-bold">Enter Your Work Details</h2>
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
                placeholder="Company Address Pincode"
                value={watch("pincode") || ""}
                onChange={handleChange("pincode")}
                error={errors.pincode?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="No. Of Years In Current Company"
                options={["0-2 Years", "2-5 Years", "5-10 Years", "10+ Years"]}
                selected={watch("years") || ""}
                onChange={(value) => handleDropdownChange("years", value)}
                error={errors.currentCompany?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Current Designation"
                value={watch("designation") || ""}
                onChange={handleChange("designation")}
                error={errors.designation?.message}
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
