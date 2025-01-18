"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "../../../utils/UserContext";
import { encryptData, decryptData } from "../../../utils/cryptoUtils"; // Import the functions
import Logout from "../../../utils/logout";
import OfferAvailable from "../../../components/LoanApply/LoanStatus/OfferAvailable";
import NoOfferAvailbale from "../../../components/LoanApply/LoanStatus/NoOffer";
import { checkOffers } from "@/api/user";
import Loader from "@/components/Common/Loader";
import { getToken } from "@/utils/cookies";

// const checkOffers =
// "https://prod.utils.buddyloan.in/fetch_user_loan_status.php";

// const checkOffers =
//   "https://prod.utils.buddyloan.in/fetch_user_appl_wise_loan_status.php";

export default function OfferPage() {
  const [userName, setUserName] = useState("Buddy");
  const [data, setData] = useState([]);
  const userId = "9On5Akji0o/fQ3OjPOgnuw==";
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Check Offer via API
  // const checkForOffers = async (userId) => {
  //   try {
  //     const payload = new URLSearchParams({
  //       userid: userId,
  //     });

  //     const response = await checkOffers(payload);

  //     setData(response.data.approved_offers["lenders-status-array"]);
  //     console.log(response.data.approved_offers["lenders-status-array"]);
  //   } catch (error) {
  //     console.log("error offer page");
  //     // toast.error("Error fetching offers");
  //   }
  // };

  // useEffect(() => {
  //   if (userId) {
  //     console.log("inside user", userId);
  //     checkForOffers(userId);
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   if (userId) {
  //     const fetchLoanStatus = async () => {
  //       console.log(userId);
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
  //         console.log("my status is", responseData);
  //         if (responseData.HTTPStatus === 200 || responseData.status === "ok") {
  //           setData(responseData.approved_offers["lenders-status-array"]);
  //           setStatus(false);
  //         } else {
  //           console.error("hello");
  //           setMessage();
  //           setStatus(true);
  //         }
  //       } catch (err) {
  //         console.error("Error fetching offer data: ", err);
  //       }
  //     };

  //     fetchLoanStatus();
  //   }
  // }, [userId]);

  useEffect(() => {
    setLoading(true);
    const token = getToken();
    const loan_status_30 = sessionStorage.getItem("loan_status_30");

    if (token) {
      // Check loan status and redirect user to journey or status page
      if (loan_status_30 === "0") {
        router.push("/apply-loan-online/user-journey");
      } else {
        router.push("/apply-loan-online/user-status");
        setLoading(false);
      }
    } else {
      router.push("/apply-loan-online/");
    }
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-[100px]">
      <h1 className="text-bold mt-100 text-center text-black"> Offer Page </h1>
      {/* <OfferAvailable userName={userName} data={data} /> */}
    </div>
  );
}
