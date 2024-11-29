import React from "react";

export default function Button({ btnName }) {
  return (
    <div className="flex justify-center py-3">
      <button
        type="submit"
        className="rounded-xl bg-bl-blue p-3 text-xl font-semibold text-white"
      >
        {btnName}
      </button>
    </div>
  );
}
