import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function QuickLoans({ title }) {
  return (
    <div className="py-8">
      <Link
        href="/apply-loan-online/?utm_source=seoweb&amp;utm_medium=webalocta&amp;utm_campaign=organic"
        className="block"
      >
        <div className="mx-auto max-w-3xl rounded-lg border bg-white p-6 shadow-md">
          <div className="flex items-center justify-between space-x-4">
            <Image
              src="/images/loan-approval.webp"
              alt="Loan Approval"
              className="w-18 h-20"
              width={100}
              height={100}
            />
            <div>
              <p className="text-xl font-semibold text-black">
                Apply for <span className="text-bl-blue">{title}</span> with
                Quick Approval
              </p>
            </div>
            <button
              className="relative rounded-md bg-bl-blue px-4 py-2 text-white hover:bg-bl-blue"
              style={{
                animation: "border-pulse 2s infinite", // Custom animation
                border: "1px solid #00b5ef", // Border color
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
