import React from "react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

export default function Logout() {
  const router = useRouter();
  const deleteSessions = () => {
    sessionStorage.removeItem("mobileNumber");
    sessionStorage.removeItem("_token");
    sessionStorage.removeItem("u_stat_bdl");
    router.push("/apply-loan-online");
  };

  return (
    <div>
      {router.pathname}
      <button
        onClick={deleteSessions}
        className="rounded-lg bg-white p-0 hover:bg-blue-400 hover:text-blue-400"
      >
        <IoIosLogOut size={30} className="text-gray-500 hover:text-bl-blue" />
      </button>
    </div>
  );
}
