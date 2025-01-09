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
import ContactUs from "@/components/Common/ContactUs"

// Fetch data from the API
async function fetchData() {
  const res = await fetch(`${ConfigData.blogAPI}/pages/21782`);
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
      h3.classList.add("my-2", "text-lg", "font-semibold");
    });
  };

    // Function to update h3 classes
    const updateH2Classes = () => {
        const h2Elements = document.querySelectorAll("h2");
        h2Elements.forEach((h2) => {
          h2.classList.remove(...h2.classList);
          h2.classList.add("my-2", "text-xl", "font-bold");
        });
      };
    // Function to update h3 classes
    const updateUlClasses = () => {
        const UlElements = document.querySelectorAll(".content ul");
        UlElements.forEach((ul) => {
          ul.classList.remove(...ul.classList);
          ul.classList.add("list-disc", "pl-5", "space-y-2");
        });
      };


  useEffect(() => {
    if (!post) return; // Wait for post data to be available

    // Update h3 classes when content is rendered
    setTimeout(() => {
        updateH3Classes();
        updateH2Classes();
        updateUlClasses();
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
      <div className="mt-10 flex justify-center items-center min-h-80 bg-gray-200 px-12">
 <h1 className="text-bl-blue text-5xl font-semibold">{post?post.title.rendered:''}</h1>
</div>

      
      <CalculatorLoop data={calcLoopData} />
      {post ? (
        <div id="dynamic-content" className="py-4 w-11/12 mx-auto" />
      ) : (
        <p>Loading...</p>
      )}
<ContactUs/>
      <LoopType data={loopType}/>
      <FaqSection faqData={faqData} />
    </>
  );
}
