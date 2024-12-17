import React from "react";
import Link from "next/link";

export default function PersonalLoan() {
  return (
    <div className="mx-auto w-[700px] rounded-lg border bg-white p-4 shadow">
      <div className="flex items-center justify-between gap-6">
        <div className="">
          <img src="/images/p-loan-approval.webp" className="w-24" />
        </div>
        <div className="text-black">
          <p className="text-xl">
            Apply for <span className="font-semibold">Personal Loan</span> with
            Quick Approval
          </p>
          {/* <p>Also get a Free Credit Report</p> */}
        </div>
        <div>
          <Link
            href="/apply-loan-online/?utm_source=seoblog&utm_medium=blogalocta&utm_campaign=organic"
            className="animate-ping rounded-full bg-bl-blue p-4 text-white shadow"
          >
            Check Now
          </Link>
        </div>
      </div>
    </div>
  );
}
