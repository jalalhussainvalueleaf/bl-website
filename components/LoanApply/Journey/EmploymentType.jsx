"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../../utils/UserContext";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";
import toast from "react-hot-toast";
import BackButton from "@/components/Common/BackButton";

const Step3 = () => {
  const [employmentType, setEmploymentType] = useState("");
  const [error, setError] = useState("");
  const { setSteps, userSearchData } = useUserContext();
  const fields = ["Salaried", "Self-Employed", "Student"];

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

  // Load saved data and selected loan type on mount
  useEffect(() => {
    const savedEmploymenType = sessionStorage.getItem("selectedEmploymentType");
    if (savedEmploymenType) {
      setEmploymentType(savedEmploymenType);
    }
  }, [setValue]);

  const handleRadioChange = (value) => {
    console.log("value", value);

    setEmploymentType(value);
    // Retrieve and update session data
    const sessionData = {
      ...(JSON.parse(sessionStorage.getItem("welcome")) || {}),
      selectedEmploymentType: value,
    };

    // Save the updated session data back to sessionStorage
    sessionStorage.setItem("welcome", JSON.stringify(sessionData));
    sessionStorage.setItem("selectedEmploymentType", value);
  };

  useEffect(() => {
    if (userSearchData) {
      const { emplyoment_type } = userSearchData;

      if (emplyoment_type === "Salaried") {
        setEmploymentType("Salaried");
      } else if (emplyoment_type === "Non Salaried") {
        setEmploymentType("Self-Employed");
      } else if (emplyoment_type === "Student") {
        setEmploymentType("Student");
      }
    }
  }, [userSearchData]);

  const onSubmit = async (data) => {
    if (!employmentType) {
      toast.error("Please select a employment type.");
      return; // Prevent form submission
    } else {
      console.log("employmentType", employmentType);
      sessionStorage.setItem("journey", employmentType);
      setSteps("Salaried");
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
            What Is Your Employment Type
          </h2>
        </div>
        <div className="mx-auto max-w-md px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <Radio
                name="Salaried"
                value="Salaried"
                isSelected={employmentType === "Salaried"}
                onChange={handleRadioChange}
                label="Salaried"
              />
              <Radio
                name="Self-Employed"
                value="Self-Employed"
                isSelected={employmentType === "Self-Employed"}
                onChange={handleRadioChange}
                label="Self-Employed"
              />
              <Radio
                name="Student"
                value="Student"
                isSelected={employmentType === "Student"}
                onChange={handleRadioChange}
                label="Student"
              />
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            <div className="my-4 mb-6 flex items-center justify-center gap-5">
              <BackButton backTo={"loanType"} />
              <Button btnName="Proceed" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step3;
