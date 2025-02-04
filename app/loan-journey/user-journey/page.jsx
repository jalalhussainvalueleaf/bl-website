"use client";
import { useUserContext } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { steps, userSearchData, setUserSearchData, setMobileNumber } =
    useUserContext();
  const router = useRouter();

  // okkkkkk

  useEffect(async () => {
    await setUserSearchData("data setting");
    setTimeout(() => {
      console.log("yess");

      router.push("/apply-loan-online/user-journey");
    }, 2000);
  }, []);
  return <div>Loan journey</div>;
};

export default Page;
