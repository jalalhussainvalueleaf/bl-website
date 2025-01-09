import React, { useState, useEffect } from "react";
import Logout from "../../../utils/logout";
import Image from "next/image";
import Link from "next/link";

export default function OfferAvailable({ data, userName }) {
  const [curatedOffersAvailable, setCuratedOffersAvailable] = useState(false);
  const [preApprovedOffersAvailable, setPreApprovedOffersAvailable] = useState(false);
  const [ccOffersAvailable, setCCOffersAvailable] = useState(false);

  useEffect(() => {
    setCuratedOffersAvailable(data?.Curated_Offers?.length > 0);
    setPreApprovedOffersAvailable(data?.Pre_Approved_Offers?.length > 0);
    setCCOffersAvailable(data?.CC_Offers?.length > 0);
  }, [data]);

  const renderOfferList = (offers, type) => (
    <div className="mx-auto w-full bg-white lg:w-[400px]">
      {offers?.length > 0 ? (
        offers.map((item, index) => (
          <Link key={index} href="">
            <div className="group rounded-3xl p-0 text-center shadow-2xl">
              <Image
                src={item.image_link ? item.image_link : item.lender_logo}
                alt={item.card_name}
                width={200}
                height={200}
                className="mx-auto w-40 rounded-3xl transition-transform group-hover:scale-105 group-hover:rounded-3xl group-hover:shadow-2xl"
              />
            </div>
          </Link>
        ))
      ) : (
        <p className="text-xl text-white">No {type} offers available.</p>
      )}
    </div>
  );

  const approvedOffers = (
    <div className="w-[400px] rounded-lg bg-white">
      <div className="h-[70px] rounded-t-lg bg-[#233A8A]">hello</div>
      <div className="text-center text-6xl font-bold">5 lakh</div>
      <div className="px-10 py-4">
        <div className="rounded-lg border border-[#233A8A] text-center">
          <div className="grid grid-cols-3">
            <div className="text-sm">Tenure</div>
            <div className="text-sm">Interest Rate</div>
            <div className="text-sm">EMI</div>
          </div>
          {/* Repeat structure if needed */}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-blue-200 bg-[url('/images/bg-loan-2.png')] bg-cover bg-no-repeat p-4 bg-blend-multiply">
      <div className="flex justify-between">
        <div className="mx-auto w-11/12">
          {(curatedOffersAvailable || preApprovedOffersAvailable || ccOffersAvailable) && (
            <h2 className="text-5xl font-semibold text-yellow-100">Congratulations</h2>
          )}
          <p className="text-xl">
            <span className="font-bold">Hi {userName},</span>
            <br />
            We already have your application. As per your last application, we have the below offers for you:
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        {curatedOffersAvailable && renderOfferList(data.Curated_Offers, "Curated")}
        {preApprovedOffersAvailable && renderOfferList(data.Pre_Approved_Offers, "Pre-Approved")}
        {ccOffersAvailable && renderOfferList(data.CC_Offers, "Credit Card")}
        {!curatedOffersAvailable && !preApprovedOffersAvailable && ccOffersAvailable && (
          <p className="text-xl font-semibold text-white">Showing Credit Card Offers Only</p>
        )}
      </div>
      <div>{approvedOffers}</div>
    </div>
  );
}
