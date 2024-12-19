"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import CreditScore from "./CreditScore";
import BuddyLoan from "./BuddyLoan";
import PersonalLoan from "./PersonalLoan";
import EligibilityCheck from "./EligibilityCheck";
import QuickLoans from "./QuickLoans";
import EmiCalculator from "../Calculators/Calculator";
import Features from "../Blogs/FeaturesBenefits";

export default function BlogContent({ content, title }) {
  const COMPONENT_MAP = {
    creditscore: { component: CreditScore },
    features: { component: Features },
    buddyloan: { component: BuddyLoan },
    personalloan: { component: PersonalLoan },
    eligibilitycheck: { component: EligibilityCheck },
    quickloans: { component: QuickLoans, props: { title } },
    emicalculator: { component: EmiCalculator },
  };

  const rootInstances = new Map(); // Store root instances to manage single createRoot calls

  function replacePlaceholders(htmlContent) {
    let instanceCounter = {};
    return htmlContent.replace(/<([a-z]+)><\/\1>/gi, (_, tag) => {
      const lowerTag = tag.toLowerCase();
      if (COMPONENT_MAP[lowerTag]) {
        instanceCounter[lowerTag] = (instanceCounter[lowerTag] || 0) + 1;
        return `<div id="${lowerTag}-component-${instanceCounter[lowerTag]}"></div>`;
      }
      return `<${tag}></${tag}>`;
    });
  }

  const updateStyles = () => {
    document.querySelectorAll("h2").forEach((h2) => {
      h2.classList.remove(...h2.classList);
      h2.classList.add("mt-3", "text-xl", "font-bold");
    });

    document.querySelectorAll("h3").forEach((h3) => {
      h3.classList.remove(...h3.classList);
      h3.classList.add("mt-3", "text-lg", "font-semibold");
    });

    document.querySelectorAll("table").forEach((table) => {
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

    document.querySelectorAll(".content ul").forEach((ul) => {
      ul.classList.remove(...ul.classList);
      ul.classList.add("list-disc", "pl-5", "space-y-2");
    });

    document.querySelectorAll(".content ul li").forEach((li) => {
      li.classList.remove(...li.classList);
      li.classList.add(
        "text-gray-800",
        "hover:text-blue-500",
        "transition-all",
        "duration-200",
      );
    });
  };

  useEffect(() => {
    Object.entries(COMPONENT_MAP).forEach(
      ([tag, { component: Component, props = {} }]) => {
        const placeholders = document.querySelectorAll(
          `[id^="${tag}-component"]`,
        );

        placeholders.forEach((placeholder) => {
          if (!rootInstances.has(placeholder)) {
            // Create a root if it doesn't already exist
            const root = ReactDOM.createRoot(placeholder);
            rootInstances.set(placeholder, root);
          }

          // Use existing root to render the component
          const root = rootInstances.get(placeholder);
          root.render(<Component {...props} />);
        });
      },
    );

    const timeoutId = setTimeout(() => {
      updateStyles();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      rootInstances.forEach((root, placeholder) => {
        root.unmount();
      });
      rootInstances.clear();
    };
  }, []);

  const transformedContent = replacePlaceholders(content);

  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: transformedContent }}
    ></div>
  );
}
