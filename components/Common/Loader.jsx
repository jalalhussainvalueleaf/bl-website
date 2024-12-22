import React from "react";

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-b-[#00b5ef] border-l-[#00b5ef] border-r-[#00b5ef] border-t-white"
        style={{
          animationDuration: "0.6s", // Speed of the spin
        }}
      ></div>
    </div>
  );
};

export default Loader;
