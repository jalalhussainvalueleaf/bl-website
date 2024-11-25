"use client";
import React, { useState } from "react";

export default function App() {
  const [isValid, setIsValid] = useState(true);
  return (
    <>
      <div>
        <h2>What is Your Email?</h2>
        <div className="relative mb-4 flex w-full items-center">
          <input
            type="text"
            className={`poppins h-[53px] w-full rounded-[12px] border-[1px] ${
              isValid ? "border-[#47B6F2]" : "border-red-500"
            } px-3 text-black outline-none focus:ring-0`}
            placeholder=""
            value=""
            maxLength="10"
          />

          <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 transform rounded-full bg-white px-1 text-[#47B6F2]">
            Loan Amount
          </label>
        </div>
        <div className="relative mb-4 flex w-full items-center">
          <input
            type="text"
            className={`poppins h-[53px] w-full rounded-[12px] border-[1px] ${
              isValid ? "border-[#47B6F2]" : "border-red-500"
            } px-3 text-black outline-none focus:ring-0`}
            placeholder=""
            value=""
            maxLength="10"
          />

          <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 transform rounded-full bg-white px-1 text-[#47B6F2]">
            Personal Email Address
          </label>
        </div>
      </div>
    </>
  );
}
