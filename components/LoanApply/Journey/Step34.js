"use client";

import React, { useState } from "react";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";
import CalendarInput from "@/components/Common/CalendarInput";

const FirstStep = () => {
  const fields = ["residenceType", "currentAddress", "pincode"];

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
                error={errors.pincode?.message}
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
