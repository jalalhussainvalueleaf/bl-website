"use client";
import LottieAnimation from "@/components/Common/LottieAnimation";
import wrong from "@/lottie/wrong.json";
import done from "@/lottie/done.json";
import { memo } from "react";

const Input = memo(
  ({ placeholder, value, onChange, type, error, maxLength, isValidEmail }) => {
    // Only show validation icons if valid prop is explicitly passed (not undefined)
    const showValidationIcon = isValidEmail !== undefined;

    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      if (type === "number" && maxLength && inputValue.length > maxLength) {
        return; // Prevent further input if maxLength is exceeded
      }
      onChange(e);
    };

    // Prevent arrow up and down on type number
    const handleKeyDown = (e) => {
      // Prevent default behavior for the up and down arrow keys
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };

    // Prevent mouse drag on type number
    const handleWheel = (e) => {
      // Prevent scrolling from changing the number value
      e.target.blur();
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
          onWheel={handleWheel}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
        />
        <label className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[#47B6F2]">
          {placeholder}
        </label>

        {/* Error */}
        {error && <p className="mt-1 text-end text-sm text-red-500">{error}</p>}

        {/* Only render validation lottie icon if showValidationIcon is true */}
        {showValidationIcon && (
          <div className="absolute right-[-15px] top-[-15px]">
            {isValidEmail ? (
              <div className="flex h-[80px] w-[80px] items-center justify-center">
                <LottieAnimation
                  animationData={done}
                  width={40}
                  height={40}
                  loop={false}
                />
              </div>
            ) : (
              <div className="flex h-[80px] w-[80px] items-center justify-center">
                <LottieAnimation
                  animationData={wrong}
                  width={38}
                  height={38}
                  loop={false}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

export default Input;
