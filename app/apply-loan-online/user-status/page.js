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

// const checkOffers =
// "https://prod.utils.buddyloan.in/fetch_user_loan_status.php";

const checkOffers =
  "https://prod.utils.buddyloan.in/fetch_user_appl_wise_loan_status.php";

export default function OfferPage() {
  const {
    userId,
    startUserNewJourney,
    showOfferPage,
    setUserId,
    setShowOfferPage,
    setStartUserNewJourney,
  } = useUserContext();
  const router = useRouter();
  // const userId = "oYx2Clg+MJOaBq9v8lookw==";

  const [offerData, setOfferData] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState("Buddy");
  const [status, setStatus] = useState(true);
  // sessionStorage.getItem("ud_token");

  const [curatedOffers, setCuratedOffers] = useState([]);
  const [preApprovedOffers, setPreApprovedOffers] = useState([]);
  const [ccOffers, setCCOffers] = useState([]);
  // const [data, setData] = useState([]);

  useEffect(() => {
    // Step 1: Check if session data exists on initial render or after refresh
    const storedEncryptedUserName = sessionStorage.getItem("ud_token");
    const storedEncryptedData = sessionStorage.getItem("u_stat_bdl");
    // const storedEncryUserName = sessionStorage.getItem("_token");

    console.log("my data stored", decryptData(storedEncryptedUserName));

    if (storedEncryptedUserName) {
      const decryptedUserName = decryptData(storedEncryptedUserName);
      setUserName(
        decryptedUserName.user[0].fname + " " + decryptedUserName.user[0].lname,
      );
    } // passed checked

    if (storedEncryptedData) {
      const decryptedData = decryptData(storedEncryptedData);
      console.log("check decryption", decryptedData);
      if (decryptedData) {
        // console.log("Decrypted Data for offers: ", decryptedData);
        if (decryptedData.userId) {
          // console.log("userId_inside", decryptedData.userId);
          setUserId(decryptedData.userId);
          // setUserId("oYx2Clg+MJOaBq9v8lookw==");
        } else {
          console.log("userId is empty, redirecting to apply-loan-online");
          router.push("/apply-loan-online");
        }
        setStartUserNewJourney(decryptedData.startUserNewJourney);
        setShowOfferPage(decryptedData.showOfferPage);
      }
    } else {
      // If no session data exists, ensure to redirect to apply-loan page
      if (!userId) {
        router.push("/apply-loan-online");
      }
    }
    // console.log('my second fake id',userId)
    // Encrypt data and store it in sessionStorage if context values are available
    if (
      userId &&
      startUserNewJourney !== undefined &&
      showOfferPage !== undefined
    ) {
      const dataToEncrypt = { userId, startUserNewJourney, showOfferPage };
      // console.log("user_id", userId);
      // console.log("user_journey", startUserNewJourney);
      // console.log("offers", showOfferPage);

      const encryptedData = encryptData(dataToEncrypt);
      // sessionStorage.setItem("u_stat_bdl", encryptedData);
      // console.log("Encrypted Data Stored in sessionStorage: ", encryptedData);
    }
  }, [
    userId,
    startUserNewJourney,
    showOfferPage,
    setUserId,
    setStartUserNewJourney,
    setShowOfferPage,
    router,
  ]);

  useEffect(() => {
    if (userId) {
      const fetchLoanStatus = async () => {
        console.log(userId);
        try {
          const payload = new URLSearchParams();
          payload.append("userid", userId);
          const response = await fetch(checkOffers, {
            method: "POST",
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: payload.toString(),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch loan status");
          }

          const responseData = await response.json();
          console.log("my status is", responseData);
          if (responseData.HTTPStatus === 200 || responseData.status === "ok") {
            setData(responseData.approved_offers["lenders-status-array"]);
            setStatus(false);
          } else {
            console.error("hello");
            setMessage();
            setStatus(true);
          }
        } catch (err) {
          console.error("Error fetching offer data: ", err);
        }
      };

      fetchLoanStatus();
    }
  }, [userId]);

  return (
    <div className="min-h-screen">
      <OfferAvailable userName={userName} data={data} />
    </div>
  );
}
