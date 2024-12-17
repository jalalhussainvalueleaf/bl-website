import React from "react";
import Link from "next/link";

export default function CreditScore() {
  return (
    <div className="mx-auto w-[700px] rounded-lg border bg-white p-4 shadow">
      <div className="flex items-center justify-between gap-6">
        <div className="">
          <img src="/images/credit-score.webp" className="w-24" />
        </div>
        <div className="text-black">
          <p className="text-xl">
            Check Your <span className="font-semibold">Credit Score</span> for
            Free
          </p>
          <p>Also get a Free Credit Report</p>
        </div>
        <div>
          <Link
            href="/buddy-score/credit-score?utm_source=seoblog&utm_medium=blogcscta&utm_campaign=organic"
            className="rounded-full bg-bl-blue p-4 text-white shadow"
          >
            Check Now
          </Link>
        </div>
      </div>
    </div>
  );
}
