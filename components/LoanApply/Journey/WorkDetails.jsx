"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";
import { checkPincodeAPI } from "@/api/user";
import { debounce } from "lodash";
import BackButton from "@/components/Common/BackButton";

const Step32 = () => {
  const { setSteps, userSearchData, setUserSearchData } = useUserContext();
  const [isPincodeValid, setIsPincodeValid] = useState(undefined);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation([
    "company_type",
    "company_name",
    "office_pincode",
    "emp_exp_month",
    "designation",
  ]);

  const debouncedValidateRef = useRef(
    debounce((field, value) => {
      if (field === "office_pincode") {
        validatePincode(value);
      }
    }, 1000),
  ).current;

  const handleInputChange = useCallback(
    (field) => (event) => {
      const { value } = event.target;
      setValue(field, value);
      trigger(field);
      debouncedValidateRef(field, value);
    },
    [setValue, trigger, userSearchData],
  );

  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  const validatePincode = async (pincode) => {
    if (pincode.length !== 6) {
      setIsPincodeValid(false);
      return false;
    }

    const payload = new URLSearchParams({ pincode });
    try {
      const response = await checkPincodeAPI(payload);
      if (
        response?.data?.status === "success" &&
        response?.data?.HTTPStatus === 200
      ) {
        setIsPincodeValid(true);
      } else {
        setIsPincodeValid(false);
      }
    } catch (error) {
      setIsPincodeValid(false);
      toast.error("Unable to verify pincode. Please try again.");
    }
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
      sessionStorage.setItem("workDetails", JSON.stringify(data));
      sessionStorage.setItem("journey", "personalDetails");
      setSteps("personalDetails");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    if (userSearchData) {
      // Destructure fields from userSearchData
      const { office_pincode, emp_exp_month } = userSearchData;

      if (emp_exp_month === "6") {
        setValue("emp_exp_month", "0-2 Years");
      } else if (emp_exp_month === "7") {
        setValue("emp_exp_month", "2-5 Years");
      } else if (emp_exp_month === "8") {
        setValue("emp_exp_month", "5-10 Years");
      } else {
        setValue("emp_exp_month", emp_exp_month);
      }

      // Iterate through the fields and set their values
      ["company_type", "company_name", "office_pincode", "designation"].forEach(
        (field) => {
          setValue(field, userSearchData[field]);
        },
      );

      // check pincode validation
      debouncedValidateRef("office_pincode", office_pincode);
    }
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
            Enter Your Work Details
          </h2>
        </div>
        <div className="mx-auto max-w-md px-5">
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
                selected={watch("company_type") || ""}
                onChange={(value) =>
                  handleDropdownChange("company_type", value)
                }
                error={errors.company_type?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Company Name"
                value={watch("company_name") || ""}
                onChange={handleInputChange("company_name")}
                error={errors.company_name?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 ">
              <Input
                type="text"
                placeholder="Current Address Pincode"
                value={watch("office_pincode") || ""}
                onChange={handleInputChange("office_pincode")}
                error={errors.office_pincode?.message}
                isValid={isPincodeValid}
                maxLength={6}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="No. Of Years In Current Company"
                options={["0-2 Years", "2-5 Years", "5-10 Years"]}
                selected={watch("emp_exp_month") || ""}
                onChange={(value) =>
                  handleDropdownChange("emp_exp_month", value)
                }
                error={errors.emp_exp_month?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Current Designation"
                value={watch("designation") || ""}
                onChange={handleInputChange("designation")}
                error={errors.designation?.message}
              />
            </div>

            <div className="my-4 mb-6 flex items-center justify-center gap-5">
              <BackButton backTo={"Salaried"} />
              <Button btnName="Proceed" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step32;
