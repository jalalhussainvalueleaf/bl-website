import React, { useState } from "react";
import PropTypes from "prop-types";

const FaqSection = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderIcon = (index) => {
    return (
      <>
        {openIndex !== index ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            >
              <circle cx="128" cy="128" r="112" />
              <path d="M 80,128 H 176" />
              <path d="M 128,80 v 96" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            >
              <circle cx="128" cy="128" r="112" />
              <path d="M 80,128 H 176" />
            </g>
          </svg>
        )}
      </>
    );
  };

  // If faqData is empty, don't render the FAQ section
  if (!faqData || faqData.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-full p-4">
      <div className="rounded-md border border-gray-200 px-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`${
              index === faqData.length - 1
                ? "border-none"
                : "border-b border-gray-300"
            } transition-all duration-300`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between px-2 py-5 text-left focus:outline-none"
            >
              <span className="font-semibold">{item.question}</span>
              <span className="flex items-center justify-center rounded-full bg-[#47b6f2] text-center text-3xl font-semibold text-white">
                {renderIcon(index)}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ${
                openIndex === index ? "max-h-[200px]" : "max-h-0"
              }`}
            >
              <div
                className="p-4 text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FaqSection.propTypes = {
  faqData: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FaqSection;
