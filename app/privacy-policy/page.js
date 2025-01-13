"use client";
import React from "react";
import ConfigData from "@/config";

export default function Page() {
  return (
    <>
      <div className="mt-10 flex min-h-80 items-center justify-center bg-gray-200">
        <h1 className="text-4xl font-bold text-bl-blue">Privacy Policy</h1>
      </div>
      <div className="container mx-auto p-4 w-11/12">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          This Privacy Policy is in accordance with the Information Technology
          (Reasonable security practices and procedures and sensitive personal
          data or information) Rules, 2011, and applicable RBI guidelines and
          regulations. It describes the information collected from you
          (hereinafter referred to as “You”, “Your” or “User”) on Your visit to
          the Platform (defined further) and use of Platform; manner and
          procedure of collection of such information; use, storage, and
          disclosure of information collected; rights and choices available to
          You with respect to the information collected; and how BValue
          Services Private Limited (hereinafter “Buddy Loan”, “We”, “Us”)
          operates its online platform(s) www.buddyloan.com and “Buddy Loan”
          (Mobile Application) (Collectively “Platform”).
        </p>
        <h2 className="text-xl font-semibold mb-2">Legal Agreement</h2>
        <p className="mb-4">
          This Policy constitutes a legal agreement between You as the User of
          the Platform, and BValue Services Private Limited as the owner of the
          Platform. For clarity, User shall mean any person, who visits, uses,
          and/or transacts through the Platform. You are permitted to use the
          Services available on the Platform only if you are a natural person, a
          citizen of India, and at least eighteen (18) years of age.
        </p>
        <h2 className="text-xl font-semibold mb-2">Consent</h2>
        <p className="mb-4">
          By visiting or accessing the Platform and voluntarily providing Us
          with information, including, but not limited to, personal information
          and sensitive personal information, You are consenting to Our use of
          the information in accordance with this Policy.
        </p>
        <p className="mb-4 font-bold">
          IF YOU DO NOT AGREE WITH THE TERMS AND CONDITIONS OF THIS POLICY,
          PLEASE DO NOT USE OR ACCESS THIS PLATFORM.
        </p>
        <h2 className="text-xl font-semibold mb-2">
          Collection and Storage of Personal Information
        </h2>
        <p className="mb-4">
          Personal Information collected from the Users is securely stored at
          servers located in India by BValue Services Private Limited. We use
          reasonable safeguards to preserve the veracity and security of the
          information collected against loss, theft, unauthorized access,
          disclosure, reproduction, use, or amendment.
        </p>
        <h2 className="text-xl font-semibold mb-2">Personal Information Collected</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Personal details like name, email address, mobile number, etc.</li>
          <li>Education and employment details.</li>
          <li>KYC documents and other information required for loan applications.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Disclosure / Sharing of Personal Information</h2>
        <p className="mb-4">
          Personal information may be shared with Lending Partners, Affiliates,
          and Service Providers for processing loan applications and other
          services.
        </p>
        <h2 className="text-xl font-semibold mb-2">Data Security</h2>
        <p className="mb-4">
          We use the highest applicable standards to protect the information
          collected. However, Users are responsible for maintaining the
          confidentiality of their login credentials.
        </p>
        <h2 className="text-xl font-semibold mb-2">Grievance Redressal Mechanism</h2>
        <p className="mb-4">
          Name: Sreetama Roy
          <br />
          Address: No. 1187, Bhagwati, 2nd Floor, 5th Main, 21st Cross, HSR
          Layout, Sector-7, Bengaluru – 560102, Karnataka
          <br />
          Contact Number: +91 9740443051
          <br />
          Email:{" "}
          <a href="mailto:legal@buddyloan.com" className="text-blue-500">
            legal@buddyloan.com
          </a>
        </p>
        <h2 className="text-xl font-semibold mb-2">Amendment of Privacy Policy</h2>
        <p className="mb-4">
          Buddy Loan reserves the right to modify this Policy to comply with RBI
          requirements and guidelines. Users will be informed of any changes.
        </p>
      </div>
    </>
  );
}
