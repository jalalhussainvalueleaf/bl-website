"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ConfigData from "@/config";
import CreditScore from "@/components/Blogs/CreditScore";
import BuddyLoan from "@/components/Blogs/BuddyLoan";
import PersonalLoan from "@/components/Blogs/PersonalLoan";
import EligibilityCheck from "@/components/Blogs/EligibilityCheck";
import QuickLoans from "@/components/Blogs/QuickLoans";
import EmiCalculator from "@/components/Calculators/Calculator";
import Features from "@/components/Blogs/FeaturesBenefits";
import FaqSection from "@/components/Common/FaqSection";
import CalculatorLoop from "@/components/Calculators/CalculatorLoop"

// Fetch data from the API
async function fetchData() {
  const res = await fetch(`${ConfigData.blogAPI}/pages/21507`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log(data)
  return data;
}

export default function Page() {

  const [faqData, setFaqData] = useState();
  const [calcLoopData, setCalLoopData] = useState();
  const [expandedSection, setExpandedSection] = useState(null);
  const [post, setPost] = useState(null);

  const COMPONENT_MAP = {
    creditscore: { component: CreditScore },
    features: { component: Features },
    buddyloan: { component: BuddyLoan },
    personalloan: { component: PersonalLoan },
    eligibilitycheck: { component: EligibilityCheck },
    quickloans: { component: QuickLoans, props: {} }, // Adjust `props` if needed
    emicalculator: { component: EmiCalculator },
  };

  const rootInstances = new Map();

  // Replace placeholders in the content with unique IDs for component rendering
  function replacePlaceholders(htmlContent) {
    const instanceCounter = {};
    return htmlContent.replace(/<([a-z]+)><\/\1>/gi, (_, tag) => {
      const lowerTag = tag.toLowerCase();
      if (COMPONENT_MAP[lowerTag]) {
        instanceCounter[lowerTag] = (instanceCounter[lowerTag] || 0) + 1;
        return `<div id="${lowerTag}-component-${instanceCounter[lowerTag]}"></div>`;
      }
      return `<${tag}></${tag}>`;
    });
  }

  // Function to update h3 classes
  const updateH3Classes = () => {
    const h3Elements = document.querySelectorAll("h3");
    h3Elements.forEach((h3) => {
      h3.classList.remove(...h3.classList);
      h3.classList.add("mt-3", "text-lg", "font-semibold");
    });
  };

  useEffect(() => {
    if (!post) return; // Wait for post data to be available

    // Update h3 classes when content is rendered
    setTimeout(() => {
        updateH3Classes();
      }, 100);  // Adjust the timeout if necessary (e.g., 100ms or more)
    const transformedContent = replacePlaceholders(post.content.rendered);
    const container = document.getElementById("dynamic-content");

    if (container) {
      container.innerHTML = transformedContent;

      // Mount React components to placeholders
      Object.entries(COMPONENT_MAP).forEach(
        ([tag, { component: Component, props = {} }]) => {
          const placeholders = container.querySelectorAll(
            `[id^="${tag}-component"]`
          );

          placeholders.forEach((placeholder) => {
            if (!rootInstances.has(placeholder)) {
              const root = ReactDOM.createRoot(placeholder);
              rootInstances.set(placeholder, root);
            }

            const root = rootInstances.get(placeholder);
            root.render(<Component {...props} />);
          });
        }
      );
    }

    // Cleanup
    return () => {
      rootInstances.forEach((root, placeholder) => {
        root.unmount();
      });
      rootInstances.clear();
    };
  }, [post]);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPost = await fetchData();
        setPost(fetchedPost);
        setFaqData(fetchedPost.faq_data);
        setCalLoopData(fetchedPost.calculator_loop.details);
        console.log('data faq',fetchedPost.calculator_loop.details)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  return (
    <>
      <div className="mt-10 flex min-h-80 items-center justify-center bg-gray-200">
        {post ? (
          <h1 className="text-4xl font-bold text-bl-blue">
            {post.title.rendered}
          </h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      
      <CalculatorLoop data={calcLoopData} />

      {post ? (
        <div id="dynamic-content" className="py-4 w-11/12 mx-auto" />
      ) : (
        <p>Loading...</p>
      )}

      <FaqSection faqData={faqData} />
    </>
  );
}
