"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"
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
import LoopType from "@/components/Common/LoopType"

// Fetch data from the API
async function fetchData() {
  const res = await fetch(`${ConfigData.blogAPI}/pages/21507`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  // console.log(data)
  return data;
}

export default function Page() {

  const [faqData, setFaqData] = useState();
  const [calcLoopData, setCalLoopData] = useState();
  const [expandedSection, setExpandedSection] = useState(null);
  const [post, setPost] = useState(null);
  const [loopType, setLoopType] = useState(null);
  const [calcBanner, setCalcBanner] = useState(null);
  
  

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
        setLoopType(fetchedPost.loan_types)
        setCalcBanner(fetchedPost.acf)
        console.log('data faq',fetchedPost.acf)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  console.log(calcBanner)

  return (
    <>
      <div className="mt-10 grid grid-cols-2 min-h-80 items-center justify-center bg-gray-200 px-12">
  <div className="p-12"
    dangerouslySetInnerHTML={{
      __html: calcBanner ? calcBanner.left_side_page_text : '',
    }}
  />
  <div className="text-center">
  <div className="mb-8"
    dangerouslySetInnerHTML={{
      __html: calcBanner ? calcBanner.right_side_page_text : '',
    }}
  />
  <Link href={calcBanner ? calcBanner.button_url: ''} className="text-white py-2 px-8 bg-bl-blue rounded-lg text-xl">{calcBanner ? calcBanner.button_name: ''}</Link>
  </div>
</div>

      
      <CalculatorLoop data={calcLoopData} />
      {post ? (
        <div id="dynamic-content" className="py-4 w-11/12 mx-auto" />
      ) : (
        <p>Loading...</p>
      )}

      <LoopType data={loopType}/>
      <FaqSection faqData={faqData} />
    </>
  );
}
