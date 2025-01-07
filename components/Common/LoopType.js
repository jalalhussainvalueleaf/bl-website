"use client";

import React, { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

export default function LoopType({data}) {

    // console.log(data)
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (sectionId) => {
        setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
      };
  return (
    <div className="mx-auto flex w-11/12 flex-wrap">
        {data &&
          data.map((section, index) => (
            <div key={index} className="mb-6 w-full px-4 md:w-1/3">
              <div className="rounded-lg border bg-gray-50 shadow-sm">
                <div className="border-b">
                  <button
                    className="rounded-lg flex w-full items-center justify-between bg-slate-200 p-2 text-left hover:bg-slate-300 focus:outline-none"
                    onClick={() => toggleSection(index)}
                    aria-expanded={expandedSection === index}
                    aria-controls={`section-${index}`}
                  >
                    <h3 className="text-lg font-semibold">{section.name}</h3>
                    <span className="">
                      {expandedSection === index ? <FiMinus /> : <FaPlus />}
                    </span>
                  </button>
                </div>
                {expandedSection === index && (
                  <div className="p-4 overflow-scroll h-48">
                    <p
                      className="mb-2 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
  )
}
