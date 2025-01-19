import React from "react";

export default function Button({ btnName }) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="group inline-flex w-6/12 w-full max-w-[120px] items-center rounded-lg bg-bl-blue p-2 px-6 text-center text-lg font-light text-white shadow-lg transition
        duration-150 ease-in-out hover:border hover:border-bl-blue  hover:bg-white hover:text-bl-blue hover:transition-all"
      >
        {btnName}
      </button>
    </div>
  );
}
