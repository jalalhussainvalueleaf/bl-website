"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logout from "../../../utils/logout";

const checkOffers =
  "https://prod.utils.buddyloan.in/fetch_user_appl_wise_loan_status.php";

export default function NoOffer() {
  // const userId = "oYx2Clg+MJOaBq9v8lookw==";

  // const [curatedOffers, setCuratedOffers] = useState(false);
  // const [preApprovedOffers, setPreApprovedOffers] = useState(false);
  // const [ccOffers, setCCOffers] = useState(false);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (userId) {
  //     const fetchLoanStatus = async () => {
  //       try {
  //         const payload = new URLSearchParams();
  //         payload.append("userid", userId);
  //         const response = await fetch(checkOffers, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type":
  //               "application/x-www-form-urlencoded; charset=UTF-8",
  //           },
  //           body: payload.toString(),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to fetch loan status");
  //         }

  //         const responseData = await response.json();
  //         console.log('my status is', responseData)
  //         if (responseData.HTTPStatus === 200 || responseData.status === "ok") {
  //           const offers = responseData.approved_offers["lenders-status-array"];

  //           if (offers.Curated_Offers.length > 0) {
  //             setCuratedOffers(true);
  //             console.log(offers.Curated_Offers)};
  //           if (offers.Pre_Approved_Offers.length > 0) setPreApprovedOffers(true);
  //           if (offers.CC_Offers.length > 0) {
  //             setCCOffers(true);
  //             setData(offers.CC_Offers);
  //           }
  //         }
  //       } catch (err) {
  //         console.error("Error fetching offer data: ", err);
  //       }
  //     };

  //     fetchLoanStatus();
  //   }
  // }, [userId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-blue-300 bg-[url('/images/bg-loan-2.png')] bg-cover bg-no-repeat p-4 bg-blend-multiply">
      {/* {data.length > 0 ? (
        <div className="mx-auto w-full lg:w-[400px]">
          {data.map((item, index) => (
            <Link key={index}
            href={item.redirection_link}
            >
            <div
              className="group rounded-3xl p-0 text-center shadow-2xl"
            >
              <Image
                src={item.image_link}
                alt={item.card_name}
                width={200}
                height={200}
                className="mx-auto w-full rounded-3xl transition-transform group-hover:scale-105 group-hover:rounded-3xl group-hover:shadow-2xl"
              />
            </div>
            </Link>
          ))}
         
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src="/images/no-offers.jpg"
            width={400}
            height={400}
            alt="No offers available"
            className="w-80"
          />
          <p className="py-4 text-xl">No offers available</p>
          
        </div>
      )} */}
      <Logout />
    </div>
  );
}
