import React from "react";
import Image from "next/image";
import Logout from "../../../utils/logout";

export default function NoOffer() {
  return (
    <div className="flex justify-between pt-20">
      <div className="flex flex-col items-center">
        {/* <Image
          src="/images/no-offer.jpg"
          width={100}
          height={100}
          alt="no offer"
          className="w-40"
        /> */}
        <div className="mx-auto rounded-lg border bg-blue-50 p-4 text-lg">
          <p className="text-3xl">
            No Loan Offers Available on your number yet.
          </p>
          <p className="text-2xl">Please,try after 30 days again</p>
        </div>
        <div></div>
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
}
