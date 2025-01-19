import React from "react";
import { useUserContext } from "@/utils/UserContext";
const BackButton = ({ backTo }) => {
  const { setSteps } = useUserContext();
  const handleBack = () => {
    sessionStorage.setItem("journey", backTo);
    setSteps(backTo);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="rounded-lg border bg-white p-2 px-4 text-center text-black shadow-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 48 48"
      >
        <path
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          d="M31 36L19 24L31 12"
        />
      </svg>
    </button>
  );
};

export default BackButton;
