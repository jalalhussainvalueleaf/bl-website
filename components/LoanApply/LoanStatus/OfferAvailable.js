import React, { useState, useEffect } from "react";
import Logout from "../../../utils/logout";
import Image from "next/image";
import Link from "next/link";

export default function OfferAvailable({ data, userName }) {
  const [curated_Offers, setCurated_Offers] = useState(false);
  const [pre_Approved_Offers, setPre_Approved_Offers] = useState(false);
  const [cC_Offers, setCC_Offers] = useState(false);

  useEffect(() => {
    if (data?.Curated_Offers?.length > 0) {
      console.log(data.Curated_Offers);
      setCurated_Offers(true);
    }
    if (data?.Pre_Approved_Offers?.length > 0) {
      console.log(data.Pre_Approved_Offers);
      setPre_Approved_Offers(true);
    }
    if (data?.CC_Offers?.length > 0) {
      console.log(data.CC_Offers);
      setCC_Offers(true);
    }
  }, [data]);

  const renderOffers = (offers, type) => {
    return (
      <div className="mx-auto w-full lg:w-[400px]">
        {offers?.length > 0 ? (
          offers.map((item, index) => (
            <Link key={index} href={item.redirection_link}>
              <div className="group rounded-3xl p-0 text-center shadow-2xl">
                <Image
                  src={item.image_link}
                  alt={item.card_name}
                  width={200}
                  height={200}
                  className="mx-auto w-full rounded-3xl transition-transform group-hover:scale-105 group-hover:rounded-3xl group-hover:shadow-2xl"
                />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-xl text-white">No {type} offers available.</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-blue-300 bg-[url('/images/bg-loan-2.png')] bg-cover bg-no-repeat p-4 bg-blend-multiply">
        <div className="flex justify-between">
          <div className="mx-auto w-11/12">
            {curated_Offers && pre_Approved_Offers && (
              <h2 className="text-5xl font-semibold">Congratulations</h2>
            )}

            <p className="text-xl">
              <span className="font-bold">Hi {userName},</span>
              <br />
              We already have your Application. As per your last application, we
              have the below offers for you:
            </p>
          </div>
        </div>

        {curated_Offers && renderOffers(data.Curated_Offers, "Curated")}
        {pre_Approved_Offers &&
          renderOffers(data.Pre_Approved_Offers, "Pre-Approved")}
        {cC_Offers && renderOffers(data.CC_Offers, "Credit Card")}
      </div>
    </>
  );
}
