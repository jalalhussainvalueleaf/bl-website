import React, { useState } from "react";

const TermsConditions = ({ termsText, isChecked, onCheckChange, error }) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  // Function to toggle Show More/Less
  const toggleText = () => {
    setIsTextExpanded((prev) => !prev);
  };

  // Function to count words and show limited content
  const renderContent = (text) => {
    const words = text.split(" ");
    if (words.length <= 15 || isTextExpanded) {
      return text;
    }
    return words.slice(0, 15).join(" ") + "...";
  };

  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-start justify-center gap-4">
        <input
          type="checkbox"
          id="accept"
          checked={isChecked}
          className="size-4 rounded border-bl-blue checked:border-bl-blue checked:bg-bl-blue focus:ring-0"
          onChange={onCheckChange}
        />
        <label htmlFor="accept" className="mt-[-6px] text-lg text-black">
          {renderContent(termsText)}
          {termsText.split(" ").length > 15 && (
            <button
              onClick={toggleText}
              className="ms-2 rounded-lg bg-gray-200 px-3"
              type="button"
            >
              {isTextExpanded ? "-Show less" : "+More"}
            </button>
          )}
        </label>
      </div>
      {/* Error */}
      {error && (
        <p className="ml-8 mt-3 text-end text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TermsConditions;
