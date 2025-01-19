"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../../utils/UserContext";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Radio from "@/components/Common/Radio";
import BackButton from "@/components/Common/BackButton";

const Step2 = () => {
  const { setSteps, userSearchData, setUserSearchData } = useUserContext();
  const [selectedLoanType, setSelectedLoanType] = useState("");

  const fields = ["personalLoan", "businessLoan"];

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormValidation(fields);

  const handleRadioChange = (value) => {
    // Update the selected loan type state
    setSelectedLoanType(value);

    if (value === "personalLoan") {
      setUserSearchData({ ...userSearchData, emplyoment_type: "Salaried" });
    } else {
      setUserSearchData({ ...userSearchData, emplyoment_type: "Business" });
    }

    // Retrieve and update session data
    const sessionData = {
      ...(JSON.parse(sessionStorage.getItem("welcome")) || {}),
      selectedLoanType: value,
    };

    // Save the updated session data back to sessionStorage
    sessionStorage.setItem("welcome", JSON.stringify(sessionData));
    sessionStorage.setItem("selectedLoanType", value);
  };

  useEffect(() => {
    if (userSearchData) {
      const { emplyoment_type, self_employement_type } = userSearchData;

      if (emplyoment_type === "Salaried") {
        setSelectedLoanType("personalLoan");
      } else if (
        self_employement_type === "Business" ||
        self_employement_type === "Self-Employed-Business"
      ) {
        setSelectedLoanType("businessLoan");
      }
    }
  }, [userSearchData]);

  const onSubmit = async (data) => {
    if (!selectedLoanType) {
      toast.error("Please select a loan type.");
      return; // Prevent form submission
    } else {
      try {
        sessionStorage.setItem("journey", selectedLoanType);
        setSteps(selectedLoanType);
        // Navigate to the next step or handle redirection
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-center text-2xl font-semibold text-bl-blue">
            What Type Of Loan?
          </h2>
        </div>
        <div className="mx-auto max-w-md px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <Radio
                name="loanType"
                value={"personalLoan"}
                isSelected={selectedLoanType === "personalLoan"}
                onChange={handleRadioChange}
                label="Personal Loan"
              />
              <Radio
                name="loanType"
                value={"businessLoan"}
                isSelected={selectedLoanType === "businessLoan"}
                onChange={handleRadioChange}
                label="Business Loan"
              />
            </div>

            <div className="my-4 mb-6 flex items-center justify-center gap-5">
              <BackButton backTo={"start"} />
              <Button btnName="Proceed" isLoading={isSubmitting} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step2;
