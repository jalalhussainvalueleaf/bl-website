"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import CreditScore from "./CreditScore";
import BuddyLoan from "./BuddyLoan";
import PersonalLoan from "./PersonalLoan";

// Mapping for placeholder tags to React components
const COMPONENT_MAP = {
  creditscore: CreditScore,
  buddyloan: BuddyLoan,
  personalloan: PersonalLoan,
};

// Function to replace placeholders with unique mount points
function replacePlaceholders(htmlContent) {
  return htmlContent.replace(
    /<([a-z]+)><\/\1>/g,
    (_, tag) =>
      COMPONENT_MAP[tag]
        ? `<div id="${tag}-component"></div>` // Replace with a unique mount point
        : `<${tag}></${tag}>`, // Keep the tag if no component matches
  );
}

export default function BlogContent({ content }) {
  useEffect(() => {
    // Dynamically render components based on placeholders
    Object.keys(COMPONENT_MAP).forEach((tag) => {
      const placeholder = document.getElementById(`${tag}-component`);
      if (placeholder) {
        const Component = COMPONENT_MAP[tag];
        ReactDOM.render(<Component />, placeholder);
      }
    });
  }, [content]);

  const transformedContent = replacePlaceholders(content);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: transformedContent }}
    ></div>
  );
}
