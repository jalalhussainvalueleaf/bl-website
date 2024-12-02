import React, { useState } from "react";

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
              id="galaAdd0"
              fill="none"
              stroke="currentColor"
              strokeDasharray="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="4"
              strokeOpacity="1"
              strokeWidth="16"
            >
              <circle id="galaAdd1" cx="128" cy="128" r="112" />
              <path id="galaAdd2" d="M 79.999992,128 H 176.0001" />
              <path id="galaAdd3" d="m 128.00004,79.99995 v 96.0001" />
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
              id="galaRemove0"
              fill="none"
              stroke="currentColor"
              strokeDasharray="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="4"
              strokeOpacity="1"
              strokeWidth="16"
            >
              <circle id="galaRemove1" cx="128" cy="128" r="112" />
              <path id="galaRemove2" d="M 80.000004,128 H 176.00001" />
            </g>
          </svg>
        )}
      </>
    );
  };

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
              <div className="p-4 text-gray-700">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
