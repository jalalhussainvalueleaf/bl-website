"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import EligibilityCheck from "@/components/Blogs/EligibilityCheck";
import QuickLoans from "@/components/Blogs/QuickLoans";
import EmiCalculator from "@/components/Calculators/Calculator";

export default function Seo({ data }) {
  // console.log("my loan data", data.title.rendered);
  const [after_banner_paragraph, setAfter_banner_paragraph] = useState(
    data.acf.after_banner_paragraph,
  );
  const [after_banner_paragraph1, setAfter_banner_paragraph1] = useState(
    data.acf.after_banner_paragraph1,
  );
  const [after_banner_paragraph2, setAfter_banner_paragraph2] = useState(
    data.acf.after_banner_paragraph2,
  );
  const [after_banner_paragraph3, setAfter_banner_paragraph3] = useState(
    data.acf.after_banner_paragraph3,
  );
  const [title, setTitle] = useState(data.title.rendered);

  // Function to update h2 classes
  const updateH2Classes = () => {
    const h2Elements = document.querySelectorAll("h2");
    h2Elements.forEach((h2) => {
      h2.classList.remove(...h2.classList);
      h2.classList.add("mt-3", "text-xl", "font-bold");
    });
  };

  // Function to update h3 classes
  const updateH3Classes = () => {
    const h3Elements = document.querySelectorAll("h3");
    h3Elements.forEach((h3) => {
      h3.classList.remove(...h3.classList);
      h3.classList.add("mt-3", "text-lg", "font-semibold");
    });
  };

  // Function to update table classes
  const updateTableClasses = () => {
    const tableElements = document.querySelectorAll("table");
    tableElements.forEach((table) => {
      table.classList.remove(...table.classList);
      table.classList.add(
        "min-w-full",
        "table-auto",
        "border-collapse",
        "border",
        "border-gray-200",
        "odd:bg-gray-100",
        "even:bg-white",
        "py-8",
      );

      const thElements = table.querySelectorAll("th, td");
      thElements.forEach((th) => {
        th.classList.add(
          "border-b",
          "border-gray-200",
          "px-4",
          "py-2",
          "text-center",
        );
      });

      const firstRow = table.querySelector("tr");
      if (firstRow) {
        firstRow.classList.add("bg-blue-200");
      }
    });
  };

  // Function to update ul and li classes
  const updateListClasses = () => {
    const ulElements = document.querySelectorAll(".content ul");
    ulElements.forEach((ul) => {
      ul.classList.remove(...ul.classList);
      ul.classList.add("list-disc", "pl-5", "space-y-2");
    });

    const liElements = document.querySelectorAll("ul li");
    liElements.forEach((li) => {
      li.classList.remove(...li.classList);
      li.classList.add(
        "text-gray-800",
        "hover:text-blue-500",
        "transition-all",
        "duration-200",
      );
    });
  };

  // useEffect to run after the content is loaded
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateH2Classes();
      updateH3Classes();
      updateTableClasses();
      updateListClasses(); // Add classes for ul and li
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [
    after_banner_paragraph,
    after_banner_paragraph1,
    after_banner_paragraph2,
    after_banner_paragraph3,
  ]);

  return (
    <>
      <div className="mx-auto w-11/12">
        <div
          className="space-y-6"
          dangerouslySetInnerHTML={{ __html: after_banner_paragraph }}
        ></div>
        {/* <EligibilityCheck /> */}
        <div
          className="space-y-6"
          dangerouslySetInnerHTML={{ __html: after_banner_paragraph1 }}
        ></div>
        <QuickLoans loan={title} />
        <div
          className="space-y-6"
          dangerouslySetInnerHTML={{ __html: after_banner_paragraph2 }}
        ></div>

        <div
          className="space-y-6"
          dangerouslySetInnerHTML={{ __html: after_banner_paragraph3 }}
        ></div>
        <EmiCalculator />
      </div>
    </>
  );
}
