"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../../utils/UserContext";
import { encryptData, decryptData } from "../../../utils/cryptoUtils"; // Import the functions
import Logout from "../../../utils/logout";
import OfferAvailable from "../../../components/LoanApply/LoanStatus/OfferAvailable";
import NoOfferAvailbale from "../../../components/LoanApply/LoanStatus/NoOffer";

const checkOffers =
  "https://prod.utils.buddyloan.in/fetch_user_loan_status.php";

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

  const [offerData, setOfferData] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState("Buddy");
  const [status, setStatus] = useState("false");
  sessionStorage.getItem("ud_token");

  useEffect(() => {
    // Step 1: Check if session data exists on initial render or after refresh
    const storedEncryptedData = sessionStorage.getItem("u_stat_bdl");
    const storedEncryptedUserName = sessionStorage.getItem("ud_token");

    if (storedEncryptedUserName) {
      const decryptedUserName = decryptData(storedEncryptedUserName);
      setUserName(
        decryptedUserName.user[0].fname + " " + decryptedUserName.user[0].lname,
      );
      // console.log("user data", decryptedUserName.user[0].lname);
    }

    if (storedEncryptedData) {
      const decryptedData = decryptData(storedEncryptedData);

      if (decryptedData) {
        // console.log("Decrypted Data for offers: ", decryptedData);
        // console.log("userId", decryptedData.userId);
        // console.log("userJourney", decryptedData.startUserNewJourney);
        // console.log("userOffer", decryptedData.showOfferPage);

        if (decryptedData.userId) {
          //   console.log("userId_inside", decryptedData.userId);
          setUserId(decryptedData.userId);
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

    // Encrypt data and store it in sessionStorage if context values are available
    if (
      userId &&
      startUserNewJourney !== undefined &&
      showOfferPage !== undefined
    ) {
      const dataToEncrypt = { userId, startUserNewJourney, showOfferPage };
      //   console.log("user_id", userId);
      //   console.log("user_journey", startUserNewJourney);
      //   console.log("offers", showOfferPage);

      const encryptedData = encryptData(dataToEncrypt);
      sessionStorage.setItem("u_stat_bdl", encryptedData);
      //   console.log("Encrypted Data Stored in sessionStorage: ", encryptedData);
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
    // Ensure userId is set before making the request
    if (userId) {
      const fetchLoanStatus = async () => {
        try {
          const payload = new URLSearchParams();
          //   payload.append("userid", "3409");
          payload.append("userid", userId); // Add the userId to the payload

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

          const responseData = await response.json(); // Parse the response as JSON
          if (responseData.partner.length > 0) {
            setData(responseData); // Set the fetched data
            setOfferData(responseData.partner); // Set the fetched offer data
            console.log(responseData.partner.length);
            setStatus(true);
          } else {
            setStatus(false);
          }

          //   console.log("Fetched Offer Data: ", responseData);
        } catch (err) {
          console.error("Error fetching offer data: ", err);
          setError("Error fetching offer data.");
        }
      };

      fetchLoanStatus(); // Call the function to fetch data
    } else {
      setError("User ID is missing.");
    }
  }, [userId]); // Re-run the effect when userId changes

  return (
    <div className="pt-38 min-h-screen p-12">
      {status ? (
        <OfferAvailable userName={userName} data={data} />
      ) : (
        <NoOfferAvailbale />
      )}
    </div>
  );
}
