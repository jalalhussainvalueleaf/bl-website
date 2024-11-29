"use client";
import React, { useState } from "react";
import Input from "../../components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import CalendarInput from "@/components/Common/CalendarInput";
import Dropdown from "@/components/Common/Dropdown";
import Image from "next/image";
import Link from "next/link";
import FaqSection from "@/components/Common/FaqSection";
import TermsConditions from "@/components/Common/TermsConditions";
import CreditScoreFAQ from "../../mock/CreditScoreFAQ";

const CreditScore = () => {
  // State to manage the visibility of extra text
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  // Specify only the fields you want to validate
  const fields = [
    "firstName",
    "lastName",
    "email",
    "panNumber",
    "dob",
    "gender",
    "pincode",
    "mobileNumber",
    "terms",
  ];

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  const formData = watch();

  // Handle form field change
  const handleChange = (field) => (e) => {
    setValue(field, e.target.value);
    trigger(field);
  };

  // Callback to handle date change
  const handleDateChange = (field, date) => {
    setValue(field, date);
    trigger(field);
    console.log("date", date);
  };

  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  // Handle form checkbox field change by updating only the specific field in formData
  const handleCheck = (field) => (e) => {
    setValue(field, e.target.checked);
    trigger(field);
  };

  // Toggle the expanded/collapsed state
  const toggleText = () => setIsTextExpanded((prev) => !prev);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-[80px] flex w-full items-start justify-between space-x-4">
        {/* Left */}
        <div className="flex w-2/5 grow flex-col items-center justify-center bg-[#47b6f2] p-4 py-10 text-center">
          <Image
            src="https://www.buddyloan.com/buddy-score/assets/image/bl_logo.png"
            height={100}
            width={150}
            alt="buddyloan"
          />
          {/* Box */}
          <div className="relative my-12 flex w-full items-center justify-around rounded-lg border-[3px] border-white py-8">
            <div className="relative flex size-1/2 items-center justify-center">
              <Image
                src="https://www.buddyloan.com/assets/image/scoreGood.png"
                height={230}
                width={230}
                alt="credit-score"
              />
            </div>
            {/* Text Div */}
            <div className="text-start">
              <h3 className="py-1 text-3xl font-bold text-white">CHECK YOUR</h3>
              <h3 className="py-1 text-3xl font-bold text-[#FFF733]">
                CREDIT SCORE
              </h3>
              <h3 className="py-1 text-3xl font-bold text-white">FOR FREE</h3>

              <button className="mt-5 rounded-full border-none bg-[#FFF733] px-6 py-3 text-xl font-normal uppercase text-black outline-none">
                get <b>Free</b> report
              </button>

              <div className="absolute right-5 top-5">
                <Image
                  src="https://www.buddyloan.com/assets/image/scoreLogo.png"
                  alt="scoreLogo"
                  height={60}
                  width={60}
                />
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="">
            <div className="rounded-xl bg-white px-6 py-4 text-2xl font-semibold text-[#47b6f2]">
              Download Buddy Loan App on
            </div>
            <div className="my-5 flex items-center justify-center gap-4">
              <Link href="https://apps.apple.com/in/app/buddy-loan-personal-loan/id1552911697?utm_medium=DownloadButton&amp;utm_source=SEO&amp;utm_campaign=bl2&amp;la=1">
                <Image
                  src="https://www.buddyloan.com/buddy-score/assets/image/app_Store.png"
                  alt="App Store"
                  width={150}
                  height={150}
                />
              </Link>

              <Link href="https://play.google.com/store/apps/details?id=com.buddyloan.vls&amp;referrer=utm_source%3DWebsite%26utm_medium%3DDownloadButton">
                <Image
                  src="https://www.buddyloan.com/buddy-score/assets/image/google_playstore.png"
                  alt="Google Play Store"
                  width={170}
                  height={170}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="mt-10 w-3/5 grow bg-white px-5">
          {/* Credit Score Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="flex items-center justify-between gap-5 py-4">
              <Input
                type="text"
                placeholder="First Name"
                value={watch("firstName") || ""}
                onChange={handleChange("firstName")}
                error={errors.firstName?.message}
              />

              {/* Last Name */}
              <Input
                type="text"
                placeholder="Last Name"
                value={watch("lastName") || ""}
                onChange={handleChange("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <div className="flex items-center justify-between gap-5 py-4">
              {/* Email ID */}
              <Input
                type="email"
                placeholder="Email"
                value={watch("email") || ""}
                onChange={handleChange("email")}
                error={errors.email?.message}
              />
              {/* PAN Number */}
              <Input
                type="text"
                placeholder="PAN Number"
                value={watch("panNumber") || ""}
                onChange={handleChange("panNumber")}
                maxLength={10} // Allow only 10 characters
                error={errors.panNumber?.message}
              />
            </div>

            {/* Date of Birth */}
            <div className="flex items-center justify-between gap-5 py-4">
              <CalendarInput
                label="Select Date"
                value={watch("dob") || null}
                onDateChange={(date) => handleDateChange("dob", date)}
                error={errors.dob?.message}
              />

              <Dropdown
                label="Gender"
                options={["Male", "Female"]}
                selected={watch("gender") || ""}
                onChange={(value) => handleDropdownChange("gender", value)}
                error={errors.gender?.message}
              />
            </div>

            <div className="mt-5 flex items-center justify-between gap-5 py-4">
              {/* Pincode */}
              <Input
                type="number"
                placeholder="Residential PIN Code"
                value={watch("pincode") || ""}
                onChange={handleChange("pincode")}
                maxLength={6} // Allow only 6 characters
                error={errors.pincode?.message}
              />

              {/* Mobile Number */}
              <Input
                type="number"
                placeholder="Mobile Numbers"
                value={watch("mobileNumber") || ""}
                onChange={handleChange("mobileNumber")}
                maxLength={10} // Allow only 10 characters
                error={errors.mobileNumber?.message}
              />
            </div>

            {/* Terms & Conditions */}
            <TermsConditions
              termsText={`I hereby appoint Buddy Loan as my authorised representative to receive my credit information from Experian (bureau) on an ongoing basis until the purpose of pulling the Bureau Score to push the lead to the lending partner associated with Buddy Loan (End Use Purpose) is satisfied or expiry of 6 months from the date the consent is collected; whichever is earlier.`}
              isChecked={watch("terms") || false}
              onCheckChange={handleCheck("terms")}
              error={errors?.terms?.message}
            />

            {/* Submit Button */}
            <div className="mt-5 flex justify-center py-3">
              <button
                type="submit"
                className="w-[90%] rounded-xl bg-bl-blue p-3 text-2xl font-semibold text-white"
              >
                Check Free Credit Score
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto my-10 max-w-screen-xl p-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-[#47B6F2]">
          Frequently Asked Questions
        </h2>
        <FaqSection faqData={CreditScoreFAQ} />
      </div>
    </div>
  );
};

export default CreditScore;
