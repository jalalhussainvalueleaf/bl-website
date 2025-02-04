"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useUserContext } from "../../../utils/UserContext";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";
import { checkPincodeAPI } from "@/api/user";
import { debounce } from "lodash";
import BackButton from "@/components/Common/BackButton";

const Step34 = () => {
  const { setSteps, userSearchData, setUserSearchData } = useUserContext();
  const fields = ["residenceType", "current_addr_month", "pincode"];

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const [isPincodeValid, setIsPincodeValid] = useState(undefined);

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

  const debouncedValidateRef = useRef(
    debounce((field, value) => {
      if (field === "pincode") {
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

  function handleBack() {
    sessionStorage.setItem("journey", "personalDetails");
    setSteps("personalDetails");
  }

  const onSubmit = async (data) => {
    try {
      // // Update only the fields that are present in `data`
      const updatedUserSearchData = { ...userSearchData };
      Object.keys(data).forEach((key) => {
        if (key in updatedUserSearchData) {
          updatedUserSearchData[key] = data[key];
        }
      });

      // Set the updated data to state
      setUserSearchData(updatedUserSearchData);

      sessionStorage.setItem("communicationAddress", JSON.stringify(data));
      sessionStorage.setItem("journey", "finish");
      setSteps("finish");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    if (userSearchData) {
      // Destructure fields from userSearchData
      const { accomodation_type, current_addr_month, pincode } = userSearchData;

      function capitalizeEachWord(str) {
        return str
          .split(" ") // Split the string into words by spaces
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          ) // Capitalize first letter and lower the rest
          .join(" "); // Join the words back with spaces
      }

      if (accomodation_type) {
        setValue("residenceType", capitalizeEachWord(accomodation_type));
      }

      if (current_addr_month == "1") {
        setValue("current_addr_month", "0 - 3 Months");
      } else if (current_addr_month == "2") {
        setValue("current_addr_month", "3 - 6 Months");
      } else if (current_addr_month == "3") {
        setValue("current_addr_month", "6 Months - 1 Year");
      } else if (current_addr_month == "4") {
        setValue("current_addr_month", "1 - 2 Years");
      } else if (current_addr_month == "5") {
        setValue("current_addr_month", "2 + Years");
      } else {
        setValue("current_addr_month", current_addr_month);
      }

      if (pincode) {
        setValue("pincode", pincode);
      }

      // check pincode validation
      debouncedValidateRef("pincode", pincode);
    }
  }, []);
  return (
    <div className="">
      <div className="">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
            Enter Communication Address
          </h2>
        </div>
        <div className="mx-auto max-w-md px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="Residence Type"
                options={[
                  "Self Owned",
                  "Owned By Parents",
                  "Owned By Siblings",
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
                selected={watch("current_addr_month") || ""}
                onChange={(value) =>
                  handleDropdownChange("current_addr_month", value)
                }
                error={errors.current_addr_month?.message}
              />
            </div>
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="Current Address Pincode"
                value={watch("pincode") || ""}
                onChange={handleInputChange("pincode")}
                error={errors.pincode?.message}
                maxLength={6}
                isValid={isPincodeValid}
              />
            </div>

            <div className="my-4 mb-6 flex items-center justify-center gap-5">
              <BackButton backTo={"personalDetails"} />
              <Button btnName="Proceed" isDisabled={!isPincodeValid} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step34;
