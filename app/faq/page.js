"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"
import ReactDOM from "react-dom/client";
import ConfigData from "@/config";
import CreditScore from "@/components/Blogs/CreditScore";
import BuddyLoan from "@/components/Blogs/BuddyLoan";
import PersonalLoan from "@/components/Blogs/PersonalLoan";
import EligibilityCheck from "@/components/Blogs/EligibilityCheck";
import QuickLoans from "@/components/Blogs/QuickLoans";
import EmiCalculator from "@/components/Calculators/Calculator";
import Features from "@/components/Blogs/FeaturesBenefits";
import FaqSection from "@/components/Common/FaqSection";
import CalculatorLoop from "@/components/Calculators/CalculatorLoop"
import LoopType from "@/components/Common/LoopType"
import ContactUs from "@/components/Common/ContactUs"



export default function Page() {

  return (
    <>
      <div className="mt-10 flex min-h-80 items-center justify-center bg-gray-200 px-12">
        <h1 className="text-5xl font-semibold text-bl-blue">Frequently Asked Questions</h1>
      </div>

      <div class="container p-4 w-11/12 mx-auto">
    

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">Does Buddy Loan Provide Loans Directly?</h2>
        <p>Buddy Loan acts as a loan aggregator rather than a direct lender. It partners with over 25 RBI registered lenders. The approval decision for loans is entirely at the discretion of these lenders. Buddy Loan facilitates the application process and connects borrowers with potential lenders, but the final decision and terms of the loan are determined by the lending institutions.</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">I Applied For A Loan Twice, But I Haven’t Received Any Response. What Should I Do?</h2>
        <p>If you haven’t received a response after applying for a loan multiple times, it’s best to reach out to the customer support team of the app. They can provide information about the status of your application and assist you further.</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">Are The Reviews Genuine, Or Are They Fabricated For Monetary Gain?</h2>
        <p>The reviews provided are genuine and reflect the experiences of users who have interacted with the app.</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">How Can I Cancel My Loan Application And Remove My Personal Details From The App?</h2>
        <p>To cancel your loan application and remove your personal details from the app, you should contact the customer support team immediately. They can guide you through the process of canceling your application and ensuring the security of your personal information.</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">Is There A Risk Of My Personal Information Being Shared With Other Financial Institutions Without My Consent?</h2>
        <p>It’s important to review the app’s privacy policy and terms of service to understand how your personal information is handled. If you have concerns about data privacy, you can reach out to the app’s customer support team for clarification.</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">Is The App Trustworthy, Or Does It Appear Suspicious?</h2>
        <p>The perception of trustworthiness can vary among users. However, if you have doubts about the authenticity of the app or its services, it’s advisable to research further or seek recommendations from trusted sources before proceeding.</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">How Can I Report Abusive Behavior Or Fraudulent Activities By The App?</h2>
        <p>Buddy Loan is committed to ethical practices and will never engage in fraudulent activities or abusive behavior. However, if you encounter any such issues, we take them seriously and urge you to immediately reach out to our customer support team. Please explain the issue in detail so that we can investigate and take appropriate action to resolve it.</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">Why Does The App Ask To Open Another Bank Savings Account?</h2>
        <p>Opening a savings account may be recommended for certain loan products, but it’s not mandatory, and you have the flexibility to explore other options.</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">Does Applying For A Loan On The App Impact Your Credit Score?</h2>
        <p>When you apply for a loan through Buddy Loan, it’s considered a soft inquiry, which means it won’t affect your credit score. We prioritize transparency and ensure that our users can explore loan options without worrying about negative impacts on their creditworthiness.</p>
    </div>

    <div class="">
        <h2 class="text-xl text-gray-700 font-semibold mb-2">What Should I Do If My Loan Doesn’t Get Approved?</h2>
        <p>If your loan application doesn’t get approved, don’t worry. You can explore other loan lending platforms available on the app to increase your chances of getting a loan.</p>
    </div>
</div>
      <CreditScore />
      <ContactUs />
      <div className="py-1 text-center font-bold">
        <p className="py-1">Looking for a personal loan?</p>
        <PersonalLoan />
      </div>
      
    </>
  );
}
