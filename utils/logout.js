import React from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const deleteSessions = () => {
    sessionStorage.removeItem("mobileNumber");
    sessionStorage.removeItem("u_stat_bdl");
    router.push("/apply-loan-online");
  };

  return (
    <div>
      {router.pathname}
      <button
        onClick={deleteSessions}
        className="rounded-lg border bg-white px-6 py-2 hover:bg-blue-400 hover:text-blue-400"
      >
        Logout
      </button>
    </div>
  );
}
