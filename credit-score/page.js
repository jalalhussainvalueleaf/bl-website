"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import CalendarInput from "@/components/Common/CalendarInput";
import Dropdown from "@/components/Common/Dropdown";
import Image from "next/image";
import Link from "next/link";
import FaqSection from "@/components/Common/FaqSection";
import TermsConditions from "@/components/Common/TermsConditions";
import CreditScoreFAQ from "../../mock/CreditScoreFAQ";
import CreditScores from "@/public/lottie/credit-score.json";
import Lottie from "@/utils/Lottie";
import ConfigData from "@/config";

const CreditScore = () => {
  // const checkPincodeAPI = `${ConfigData.domainAPI}/autopopulate_pincode_api.php`;
  // // State to manage the visibility of extra text
  // const [isTextExpanded, setIsTextExpanded] = useState(false);
  // const [showOtp, setShowOtp] = useState(false);
  // const [otpMessage, setOtpMessage] = useState("");
  // const [pincodeError, setPincodeError] = useState("");
  // const [isPincodeValid, setIsPincodeValid] = useState(false);
  // const validatePincode = async (pincode) => {
  //   if (pincode.length !== 6) {
  //     console.log("pincode length check");
  //     setIsPincodeValid(false);
  //     setPincodeError("Pincode must be 6 digits.");
  //     return false;
  //   }
  //   const payload = new URLSearchParams({ pincode });
  //   try {
  //     const response = await fetch(checkPincodeAPI, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //       },
  //       body: payload.toString(),
  //     });
  //     const result = await response.json();
  //     console.log("pincode result", result);
  //     if (response.ok && result.HTTPStatus === 200) {
  //       setIsPincodeValid(true);
  //       setPincodeError("");
  //       return true;
  //     } else {
  //       setIsPincodeValid(false);
  //       setPincodeError(result.message || "Invalid pincode.");
  //       return false;
  //     }
  //   } catch (error) {
  //     setIsPincodeValid(false);
  //     setPincodeError("Error validating pincode. Please try again.");
  //     console.error("Pincode validation error:", error);
  //     return false;
  //   }
  // };
  // // Specify only the fields you want to validate
  // const fields = [
  //   "firstName",
  //   "lastName",
  //   "email",
  //   "panNumber",
  //   "dob",
  //   "gender",
  //   "pincode",
  //   "mobileNumber",
  //   "terms",
  // ];
  // const inputRefs = useRef([]);
  // const {
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   setValue,
  //   watch,
  //   trigger,
  // } = useFormValidation(fields);
  // const formData = watch();
  // // Handle form field change
  // const handleChange = (field) => async (e) => {
  //   const value = e.target.value;
  //   setValue(field, value);
  //   // trigger(field);
  //   if (field === "pincode") {
  //     await validatePincode(value);
  //   }
  // };
  // // Callback to handle date change
  // const handleDateChange = (field, date) => {
  //   setValue(field, date);
  //   trigger(field);
  //   console.log("date", date);
  // };
  // const handleDropdownChange = (field, value) => {
  //   setValue(field, value);
  //   trigger(field);
  // };
  // // Handle form checkbox field change by updating only the specific field in formData
  // const handleCheck = (field) => (e) => {
  //   setValue(field, e.target.checked);
  //   trigger(field);
  // };
  // // Toggle the expanded/collapsed state
  // const toggleText = () => setIsTextExpanded((prev) => !prev);
  // // Handle form submission
  // const onSubmit = async (data) => {
  //   try {
  //     console.log("Form submitted successfully:", data);
  //   } catch (error) {
  //     console.error("Form submission error:", error);
  //   }
  // };
  // // Handle OTP input
  // const handleInputChange = (e, index) => {
  //   const value = e.target.value;
  //   if (!/^\d*$/.test(value)) {
  //     e.target.value = ""; // Clear invalid input
  //     return;
  //   }
  //   if (value.length === 1 && index < inputRefs.current.length - 1) {
  //     inputRefs.current[index + 1].focus();
  //   }
  //   if (value.length === 0 && index > 0) {
  //     inputRefs.current[index - 1].focus();
  //   }
  //   if (inputRefs.current.every((input) => input?.value)) {
  //     const enteredOtp = inputRefs.current.map((input) => input.value).join("");
  //     verifyOtp(enteredOtp, mobileNumber);
  //     // setVerifyOtp(enteredOtp);
  //   } else {
  //     // setMessage(""); // Clear message if OTP is incomplete
  //   }
  // };
  // return (
  //   <div className="bg-gray-50">
  //     <div className="mt-20 grid w-full lg:grid-cols-2 ">
  //       <div className="relative flex h-screen justify-center bg-bl-blue">
  //         <div className="flex flex-col items-center justify-center p-4 text-center">
  //           {/* Box */}
  //           <div className="relative flex flex-col items-center justify-around rounded-lg  bg-bl-blue py-8 lg:w-6/12">
  //             <div>
  //               <h3 className="py-1 text-3xl font-bold text-white">
  //                 CHECK YOUR{" "}
  //                 <span className="py-1 text-3xl font-bold text-[#FFF733]">
  //                   CREDIT SCORE{" "}
  //                 </span>
  //                 FOR <span className="text-black">FREE!</span>
  //               </h3>
  //             </div>
  //             <div className="relative flex items-center justify-center py-8">
  //               <Lottie data={CreditScores} loop={false} />
  //             </div>
  //             <div className="text-start">
  //               <button className="mt-5 rounded-full border-none bg-[#FFF733] px-6 py-3 text-xl font-normal uppercase text-black outline-none">
  //                 get <b>Free</b> report
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="absolute right-5 top-5">
  //           <Image
  //             src="/images/scoreLogo.png"
  //             alt="scoreLogo"
  //             height={60}
  //             width={60}
  //           />
  //         </div>
  //       </div>
  //       <div className="flex h-screen items-center justify-center p-12">
  //         <form onSubmit={handleSubmit(onSubmit)}>
  //           {/* Full Name */}
  //           <div className="flex items-center justify-between gap-5">
  //             <Input
  //               type="text"
  //               placeholder="First Name"
  //               value={watch("firstName") || ""}
  //               onChange={handleChange("firstName")}
  //               error={errors.firstName?.message}
  //             />
  //             {/* Last Name */}
  //             <Input
  //               type="text"
  //               placeholder="Last Name"
  //               value={watch("lastName") || ""}
  //               onChange={handleChange("lastName")}
  //               error={errors.lastName?.message}
  //             />
  //           </div>
  //           <div className="flex items-center justify-between gap-5 py-4">
  //             {/* Email ID */}
  //             <Input
  //               type="email"
  //               placeholder="Email"
  //               value={watch("email") || ""}
  //               onChange={handleChange("email")}
  //               error={errors.email?.message}
  //             />
  //             {/* PAN Number */}
  //             <Input
  //               type="text"
  //               placeholder="PAN Number"
  //               value={watch("panNumber") || ""}
  //               onChange={handleChange("panNumber")}
  //               maxLength={10} // Allow only 10 characters
  //               error={errors.panNumber?.message}
  //             />
  //           </div>
  //           {/* Date of Birth */}
  //           <div className="flex items-center justify-between gap-5">
  //             <CalendarInput
  //               label="Select Date"
  //               value={watch("dob") || null}
  //               onDateChange={(date) => handleDateChange("dob", date)}
  //               error={errors.dob?.message}
  //             />
  //             <Dropdown
  //               label="Gender"
  //               options={["Male", "Female"]}
  //               selected={watch("gender") || ""}
  //               onChange={(value) => handleDropdownChange("gender", value)}
  //               error={errors.gender?.message}
  //             />
  //           </div>
  //           <div className="mt-5 flex items-center justify-between gap-5 pt-4">
  //             {/* Pincode */}
  //             <Input
  //               type="text"
  //               placeholder="Residential PIN Code"
  //               value={watch("pincode") || ""}
  //               onChange={handleChange("pincode")}
  //               maxLength={6} // Allow only 6 characters
  //               error={errors.pincode?.message}
  //             />
  //             {/* Mobile Number */}
  //             <Input
  //               type="text"
  //               placeholder="Mobile Numbers"
  //               value={watch("mobileNumber") || ""}
  //               onChange={handleChange("mobileNumber")}
  //               maxLength={10} // Allow only 10 characters
  //               error={errors.mobileNumber?.message}
  //             />
  //           </div>
  //           {/* Terms & Conditions */}
  //           <TermsConditions
  //             termsText={`I hereby appoint Buddy Loan as my authorised representative to receive my credit information from Experian (bureau) on an ongoing basis until the purpose of pulling the Bureau Score to push the lead to the lending partner associated with Buddy Loan (End Use Purpose) is satisfied or expiry of 6 months from the date the consent is collected; whichever is earlier.`}
  //             isChecked={watch("terms") || false}
  //             onCheckChange={handleCheck("terms")}
  //             error={errors?.terms?.message}
  //           />
  //           {/* Submit Button */}
  //           <div className="mt-5 flex justify-center py-3">
  //             <button
  //               type="submit"
  //               className="rounded-xl bg-bl-blue p-3 text-xl  text-white"
  //             >
  //               Check Free Credit Score
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //     <div className="mx-auto my-10 max-w-screen-xl  p-4">
  //       <h2 className="mb-6 text-center text-3xl font-bold text-[#47B6F2]">
  //         Frequently Asked Questions
  //       </h2>
  //       <FaqSection faqData={CreditScoreFAQ} />
  //     </div>
  //   </div>
  // );
};

export default CreditScore;
