"use client";
import React from "react";

const Input = ({ placeholder, value, onChange, type, error, maxLength }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (type === "number" && maxLength && inputValue.length > maxLength) {
      return; // Prevent further input if maxLength is exceeded
    }
    onChange(e);
  };

  return (
    <div className="relative mb-4 w-full">
      <input
        type={type}
        className={`h-[47.47px] w-full rounded-[12px] border-DEFAULT px-3 ${
          error ? "border-red-500" : "border-[#47B6F2]"
        } text-black outline-none focus:border-[#47B6F2] focus:ring-0`}
        placeholder=""
        value={value}
        onChange={handleInputChange}
        maxLength={maxLength} // Restrict input length
      />
      <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[#47B6F2]">
        {placeholder}
      </label>

      {/* Error */}
      {error && <p className="mt-1 text-end text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
