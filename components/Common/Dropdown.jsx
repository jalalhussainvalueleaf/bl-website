"use-client";
import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ label, options, selected, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef();

  const handleSelect = (option) => {
    onChange(option); // Propagate the selected value back to the parent
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full bg-white" ref={selectRef}>
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
        <span className="grow text-black">{selected}</span>

        <button
          type="button"
          className="ml-auto flex size-7 items-center justify-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 7"
          >
            <path
              fill="#000"
              d="M8 6.5a.47.47 0 0 1-.35-.15l-4.5-4.5c-.2-.2-.2-.51 0-.71c.2-.2.51-.2.71 0l4.15 4.15l4.14-4.14c.2-.2.51-.2.71 0c.2.2.2.51 0 .71l-4.5 4.5c-.1.1-.23.15-.35.15Z"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-scroll rounded-lg border bg-white shadow-lg">
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
