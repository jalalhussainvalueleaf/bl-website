"use client";

import React, { useState } from "react";
import Input from "@/components/Common/Input";
import { useFormValidation } from "@/hooks/useValidation";
import Button from "@/components/Common/Button";
import Dropdown from "@/components/Common/Dropdown";
import Modal from "@/components/Common/Modal";

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
      console.log("Form submitted successfully:", finalData);
      console.log("Step 35 submitted:", data);
      onNext();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const data = `
  
  CONSENT IN RELATION TO ACCESS TO CREDIT INFORMATION THROUGH EXPERIAN

This End User Agreement (the “Agreement”) is made between you (the “User” or “You”) and Buddyloan legally knownas Bvalue Services Pvt. Ltd, a private limited company having its registered office at No 1187, Bhagwati, 2nd Floor, 4th Floor, 5th Main, 21st Cross, Sector 7, HSR Layout, Bangalore - 560102 (“CLIENT”, “Us” or “We”, which term shall include its successors and permitted assigns). The User and CLIENT shall be collectively referred to as the “Parties”

You hereby consent to Buddy Loans being appointed as your authorised representative to receive your Credit Information on an ongoing basis for up to a period of 6 months from Experian for the purpose of Pulling the Bureau Score to push the lead to the lending partner associated with the Buddyloan (“End Use Purpose”).

BY EXECUTING THIS AGREEMENT / CONSENT FORM, YOU ARE EXPRESSLY AGREEING TO ACCESS THE EXPERIAN CREDIT INFORMATION REPORT AND CREDIT SCORE, AGGREGATE SCORES, INFERENCES, REFERENCES AND DETAILS (AS DEFINED BELOW)(TOGETHER REFERRED AS “CREDIT INFORMATION”). YOU HEREBY ALSO IRREVOCABLY AND UNCONDITIONALLY CONSENT TO SUCH CREDIT INFORMATION BEING PROVIDED BY EXPERIAN TO YOU AND BUDDY LOANS BY USING EXPERIAN TOOLS, ALGORITHMS AND DEVICES AND YOU HEREBY AGREE, ACKNOWLEDGE AND ACCEPT THE TERMS AND CONDITIONS SET FORTH HEREIN.
Terms and Conditions:
Information Collection, Use, Confidentiality, No-Disclosure and Data Purging
BUDDY LOANS shall access your Credit Information as your authorized representative and BUDDY LOANS shall use the Credit Information for limited End Use Purpose consisting of and in relation to the services proposed to be availed by you from BUDDY LOANS. We shall not aggregate, retain, store, copy, reproduce, republish, upload, post, transmit, sell or rent the Credit Information to any other person and the same cannot be copied or reproduced other than as agreed herein and in furtherance to CICRA.

The Parties agree to protect and keep confidential the Credit Information both online and offline.

The Credit Information shared by you, or received on by us on your behalf shall be destroyed, purged, erased promptly within 1 (one) Business Day of upon the completion of the transaction/ End Use Purpose for which the Credit Information report was procured for up to a maximum of 6 months.

Governing Law and Jurisdiction
The relationship between you and BUDDY LOANS shall be governed by laws of India and all claims or disputes arising there from shall be subject to the exclusive jurisdiction of the courts of Mumbai.

Definitions:
Capitalised terms used herein but not defined above shall have the following meanings:

“Business Day” means a day (other than a public holiday) on which banks are open for general business in Mumbai.

“Credit Information Report” means the credit information / scores/ aggregates / variables / inferences or reports which shall be generated by Experian.

“Credit Score” means the score which shall be mentioned on the Credit Information Report which shall be computed by Experian.

“CICRA” shall mean the Credit Information Companies (Regulation) Act, 2005 read with the Credit Information Companies Rules, 2006 and the Credit Information Companies Regulations, 2006, and shall include any other rules and regulations prescribed thereunder.

PLEASE READ THE ABOVEMENTIONED TERMS AND CONDITIONS AND CLICK ON “ACCEPT” FOLLOWED BY THE LINK BELOW TO COMPLETE THE AUTHORISATION PROCESS/ FOR SHARING OF YOUR CREDIT INFORMATION BY EXPERIAN WITH BUDDY LOANS IN ITS CAPACITY AS YOUR AUTHORISED REPRESENTATIVE.
BY CLICKING “ACCEPT” YOU AGREE AND ACCEPT THE DISCLAIMERS AND TERMS AND CONDITIONS SET OUT HEREIN.

** This document is an electronic record in terms of the Information Technology Act, 2000 and Rules made there under, and the amended provisions pertaining to electronic records.

Powered By Experian
  `;

  const moreData = `
I hereby appoint Buddy Loan as my authorized representative to receive my Credit Information from Experian, on an ongoing basis until the purpose of Pulling the Bureau Score to push the lead to the lending partner associated with Buddy Loan ("End Use Purpose") is satisfied or expiry of 6 months from the date the consent collected; whichever is earlier.`;

  return (
    <div className="bg-white">
      <div className="mt-10 bg-white py-12">
        <div className="mx-auto max-w-md px-5">
          <h2 className="py-8 text-2xl font-bold">
            Income & Bank Details step-34
          </h2>
        </div>
        <div className="mx-auto max-w-md rounded-lg border px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center justify-between">
              <Input
                type="text"
                placeholder="Monthly Income"
                value={watch("pincode") || ""}
                onChange={handleChange("pincode")}
                error={errors.pincode?.message}
              />
              <small>
                (Income mentioned Should be Verifiable as per your bank)
              </small>
            </div>

            <div className="flex items-center justify-between gap-5 py-4">
              <Dropdown
                label="Select Your Bank"
                options={[
                  "State Bank of India",
                  "HDFC Bank",
                  "Kotak Bank",
                  "Canara Bank",
                  "Union Bank of India",
                  "Allahabad Bank",
                  "Andhra Bank",
                  "Axis Bank",
                  "Bank of Bahrain and Kuwait",
                  "Bank of Baroda - Corporate Banking",
                  "Bank of Baroda - Retail Banking",
                  "Bank of India",
                  "Bank of Maharashtra",
                  "Central Bank of India",
                  "City Union Bank",
                  "Corporation Bank",
                  "Deutsche Bank",
                  "Development Credit Bank",
                  "Dhanlaxmi Bank",
                  "Federal Bank",
                  "ICICI Bank",
                  "IDBI Bank",
                  "Indian Bank",
                  "Indian Overseas Bank",
                  "IndusInd Bank",
                  "ING Vysya Bank",
                  "Jammu and Kashmir Bank",
                  "Karnataka Bank Ltd",
                  "Karur Vysya Bank",
                  "Laxmi Vilas Bank",
                  "Oriental Bank of Commerce",
                  "Punjab National Bank - Corporate Banking",
                  "Punjab National Bank - Retail Banking",
                  "Punjab & Sind Bank",
                  "Shamrao Vitthal Co-operative Bank",
                  "South Indian Bank",
                  "State Bank of Bikaner & Jaipur",
                  "State Bank of Hyderabad",
                  "State Bank of Mysore",
                  "State Bank of Patiala",
                  "State Bank of Travancore",
                  "Syndicate Bank",
                  "Tamilnad Mercantile Bank Ltd",
                  "UCO Bank",
                  "United Bank of India",
                  "Vijaya Bank",
                  "Yes Bank Ltd",
                  "Others",
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
                label="Are You Interested In a Credit Card"
                options={["Yes", "No"]}
                selected={watch("currentAddress") || ""}
                onChange={(value) =>
                  handleDropdownChange("currentAddress", value)
                }
                error={errors.currentAddress?.message}
              />
            </div>
            <div>
              <p>
                I hereby declare that I have read, understood and agree to the
                Terms and Conditions and the privacy policy .I allow Buddy Loan,
                its Lending Partners and subsidiaries to contact me via
                Phone/email or any other mode of communication in loan, credit
                card or any other related matters / Information / Promotion. I
                hereby appoint Buddy Loan as my authorized representative to
                receive my Credit Information from{" "}
                <Modal
                  title="Consent"
                  data={data}
                  btnName="close"
                  link="Experian"
                />{" "}
                <Modal
                  title="Consent"
                  data={moreData}
                  btnName="close"
                  link="more+"
                />
              </p>
            </div>

            <Button btnName="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
