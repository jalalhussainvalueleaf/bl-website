import React from "react";
import Link from "next/link";

export default function EligibilityCheck() {
  return (
    <div className="mx-auto flex w-8/12 justify-center gap-4 py-6">
      <div className="group w-full">
        <Link
          href="/personal-loan-eligibility-calculator?utm_source=seoweb&amp;utm_medium=commonelgbtn&amp;utm_campaign=organic&amp;utm_content=elgcal"
          className="block"
        >
          <div className="flex items-center justify-between rounded-lg bg-bl-blue p-4 text-white">
            <div>
              <p className="text-xl font-semibold">Check Your Eligibility</p>
              <p>Get Your Loan Eligibility Now!</p>
            </div>
            <img
              src="/images/check-btn.svg"
              alt="Check Eligibility"
              className="h-20 w-20 group-hover:transform"
            />
          </div>
        </Link>
      </div>

      <div className="w-full">
        <Link
          href="/buddy-score/credit-score?utm_source=seoweb&amp;utm_medium=commoncsbtn&amp;utm_campaign=organic&amp;utm_content=csbtn"
          className="block"
        >
          <div className="flex items-center justify-between rounded-lg bg-bl-blue p-4 text-white">
            <div>
              <p className="text-xl font-semibold">Free Credit Score</p>
              <p>Get Your Free Credit Score Here!</p>
            </div>
            <img
              src="/images/cr-scr.svg"
              alt="Credit Score"
              className="h-20 w-20"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
