import React from "react";

const Radio = ({ value, isSelected, onChange, label }) => {
  return (
    <div
      className={`mb-4 flex h-[58px] w-full items-center justify-start rounded-[16px] border  ${
        isSelected
          ? "bg-gradient-to-r from-[#47b6f2] to-[#2f88f0] text-white"
          : "bg-gray-100 text-black"
      }`}
      onClick={() => onChange(value)}
    >
      <div className="relative flex items-center pl-8">
        <input
          id={value}
          type="radio"
          name="loanType"
          value={value}
          className="peer hidden"
          checked={isSelected}
          readOnly
          onChange={() => onChange(value)}
        />
        <div
          className={`flex size-6 items-center justify-center rounded-full border ${
            isSelected
              ? "border-white bg-white"
              : "border-gray-400 bg-transparent"
          }`}
        >
          {isSelected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <label htmlFor={value} className="ms-4 text-xl">
        {label}
      </label>
    </div>
  );
};

export default Radio;
