import React from "react";
import Link from "next/link";

export default function BuddyLoan() {
  return (
    <div className="mx-auto w-[800px] rounded-lg border p-4 shadow">
      <div className="flex items-center justify-between gap-6">
        <div className="">
          <img src="/images/buddyloan-logo.png" className="h-20 w-[350px]" />
        </div>
        <div className="w-full text-center text-black">
          <p className="text-xl">
            Apply for Loan on <span className="font-semibold">BUDDYLOAN</span>{" "}
            App
          </p>
          <p>Interest rates starts @11.99% p.a. onwards</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link href="https://play.google.com/store/apps/details?id=com.buddyloan.vls&utm_source=seoblog&utm_medium=blogpscta&utm_campaign=organic">
            <img src="/images/google-play.png" />
            <p className="pt-2 text-[10px]">Rated 4.5 on Google Play</p>
          </Link>
          <Link href="https://apps.apple.com/in/app/buddy-loan-personal-loan/id1552911697?utm_source=seoblog&utm_medium=blogascta&utm_campaign=organic">
            <img src="/images/apple.png" />
            <p className="pt-2 text-[10px]">10M+ App Installs</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
