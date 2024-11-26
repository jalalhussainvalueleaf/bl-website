import React from "react";
import Logout from "../../../utils/logout";

export default function OfferAvailable({ data, userName }) {
  return (
    <>
      {/* {userId} */}
      {/* {startUserNewJourney} {showOfferPage}
      <h1>Offer Page</h1>
      <p>User ID: {userId}</p>
      <p>Start New Journey: {startUserNewJourney ? "Yes" : "No"}</p>
      <p>Show Offer Page: {showOfferPage ? "Yes" : "No"}</p> */}
      <div className="flex justify-between pt-20">
        <div className="mx-auto w-7/12">
          <p className="text-3xl">
            Hi {userName}, We already have your Application as per your Last
            Application we have Below Offers for you-
          </p>
        </div>
        <div></div>
        <div>
          <Logout />
        </div>
      </div>

      <div className="">
        {/* <h1>Offer Page</h1>
        <p>Status: {data?.status}</p> */}

        {/* <h2 className="pb-8 pt-20 text-3xl uppercase">Offer</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {data?.partner?.map((partner, index) => (
            <div
              className="card font-poppins min-w-[300px] max-w-md rounded-xl border border-gray-300 bg-white shadow-[rgba(0,0,0,0.35)_0px_5px_15px] transition-transform lg:min-w-[380px]"
              data-index={index}
              key={index}
            >
              <div className="${getStatusClass(card.status)} rounded-t-lg p-3 ">
                <h2 className="font-poppins font-semibold text-gray-700">
                  {partner.partner_name}
                </h2>
              </div>
              <div className="space-y-4 p-4">
                <div className="font-poppins grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Loan Amount:</p>
                    <p className="font-poppins text-gray-800">Loan Amount</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pf insurance:</p>
                    <p className="text-gray-800">Id</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">ROI:</p>
                    <p className="text-gray-800">Date</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Loan Tenure:</p>
                    <p className="text-gray-800">tenure</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    className="font-poppins ${getStatusClass(
                card.status
              )} text-black-800 lg:text-md rounded-full border border-gray-200 px-6 py-2 text-sm font-medium transition-colors hover:bg-blue-200"
                  >
                    button
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <h2 className="pb-8 pt-20 text-3xl uppercase">Preferred Lenders</h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.partner_new?.new_prefered_lenders?.map((lender, index) => (
            <div
              className=" rounded-xl border border-gray-300 bg-white transition-transform hover:shadow-[rgba(0,0,0,0.35)_0px_5px_15px] "
              data-index={index}
              key={index}
            >
              <div
                className={`flex items-center justify-between rounded-t-lg p-3 ${
                  lender.offer_status === "Pending"
                    ? "border-[#F9A61A] bg-[linear-gradient(90deg,_#FFC87A_0%,_#FFFFFF_100%)]"
                    : "border-[#47B6F2] bg-[linear-gradient(90deg,_#47B6F2_0%,_#FFFFFF_100%)]"
                } text-black-800 lg:text-md px-6 py-2 text-sm font-medium transition-colors hover:bg-blue-200`}
              >
                <img
                  src={lender.lender_logo}
                  className="size-12 rounded-full border object-cover"
                />
                <h2 className="font-poppins font-semibold text-gray-700">
                  {lender.partner}
                </h2>
              </div>
              <div className="space-y-4 p-4">
                <div className="font-poppins grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Application Date:</p>
                    <p className="font-poppins text-gray-800">
                      {lender.application_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Application ID:</p>
                    <p className="text-gray-800">{lender.application_id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Loan Amount:</p>
                    <p className="text-gray-800">{lender.loan_amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Loan Tenure:</p>
                    <p className="text-gray-800">{lender.loan_tenure}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Offer Amount:</p>
                    <p className="text-gray-800">{lender.offer_amount}</p>
                  </div>
                  <a
                    href={lender.tracking_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-poppins ${
                      lender.offer_status === "Pending"
                        ? "border-[#F9A61A] bg-[linear-gradient(90deg,_#FFC87A_0%,_#FFFFFF_100%)]"
                        : "border-[#47B6F2] bg-[linear-gradient(90deg,_#47B6F2_0%,_#FFFFFF_100%)]"
                    } text-black-800 lg:text-md rounded-full border border-gray-200 px-6 py-2 text-sm font-medium transition-colors hover:bg-blue-200`}
                  >
                    {lender.offer_status}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
