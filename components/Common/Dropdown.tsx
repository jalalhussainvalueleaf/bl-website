"use-client";
import React, { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
  error?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option); // Propagate the selected value back to the parent
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Label overlapping the border */}
      <span className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[#47B6F2]">
        {label}
      </span>

      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`mt-2 flex h-[47.47px] w-full cursor-pointer items-center rounded-[12px] border px-3 ${
          error ? "border-red-500" : "border-[#47B6F2]"
        } focus:outline-none focus:ring-2 focus:ring-[#47B6F2]`}
      >
        {/* Display the selected value if there is one */}
        <span className="grow text-[#47B6F2]">{selected}</span>

        <button
          type="button"
          className="ml-auto flex size-7 items-center justify-center rounded-full bg-[#47B6F2] text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-[#47B6F2]"
        >
          <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-2 text-left text-[#47B6F2] hover:bg-blue-100 ${
                option === selected ? "bg-blue-100" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="mt-1 text-end text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Dropdown;
