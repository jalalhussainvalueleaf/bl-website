"use client";
import React from "react";
import Link from "next/link";
import CountUp from "react-countup";

export default function Banner() {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-2 bg-slate-200">
        <div className="flex flex-col items-center justify-end space-y-4">
          <h1 className="text-5xl font-bold text-black">
            Want A Personal Loan?
          </h1>
          <h3 className="text-4xl font-bold text-bl-blue">80% Approval Rate</h3>
          <Link
            href="/apply-loan-online/?utm_source=seo&utm_medium=homepgbanappnowbtn&utm_campaign=organic"
            className="text-whitex` w-[150px] rounded-full bg-bl-blue p-4 text-center"
          >
            Apply Now
          </Link>
        </div>
        <div className="flex h-[60vh] items-end justify-center">
          <div className="grid h-[300px] w-[500px] grid-cols-2 rounded-2xl border bg-white shadow">
            <div className="flex flex-col items-center justify-center">
              <CountUp
                end={2000}
                suffix=" Cr +"
                className="text-4xl font-semibold"
              />
              <p className="py-4 text-sm">Loans Disbursed</p>
            </div>
            <div className="flex flex-col items-center justify-center border-b border-l">
              <CountUp
                end={10}
                suffix=" M +"
                className="text-4xl font-semibold"
              />
              <p className="py-4 text-sm">App Installs</p>
            </div>
            <div className="flex flex-col items-center justify-center  border-t">
              <CountUp
                end={50}
                suffix=" +"
                className="text-4xl font-semibold"
              />
              <p className="py-4 text-sm">Verified Lenders</p>
            </div>
            <div className="flex flex-col items-center justify-center border-l">
              <CountUp
                end={4.5}
                suffix="<small class='font-normal text-sm'>out of 5</small>"
                className="text-4xl font-semibold"
              />
              <p className="py-4 text-sm">Ratings On Google Play</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid h-[40vh] grid-cols-2 gap-10 bg-slate-200">
        <div className="flex items-center justify-end">
          <Link
            href="/buddy-score/credit-score?utm_source=seo&utm_medium=homepgcsbtn&utm_campaign=organic"
            className="flex h-20 w-[500px] items-center justify-center gap-4 rounded-full bg-bl-blue shadow"
          >
            <div>
              <p className="text-2xl text-white">Free Credit Score</p>
              <p className="text-sm text-white">
                Get Your Free Credit Score Here!
              </p>
            </div>
            <img src="/images/cr-scr.svg" className="w-24" />
          </Link>
        </div>
        <div className="flex items-center justify-start">
          <Link
            href="/loan-eligibility-calculator?utm_source=seo&utm_medium=homepgelgbtn&utm_campaign=organic"
            className="flex h-20 w-[500px] items-center justify-center gap-4 rounded-full bg-bl-blue shadow"
          >
            <div>
              <p className="text-2xl text-white">Check Eligibility</p>
              <p className="text-sm text-white">
                Get Your Loan Eligibility Now!
              </p>
            </div>
            <img src="/images/check-btn.svg" className="w-14" />
          </Link>
        </div>
      </div>
    </div>
  );
}
