"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import CalculatorLoop from "@/components/Calculators/CalculatorLoop";
import LoopType from "@/components/Common/LoopType";
import ContactUs from "@/components/Common/ContactUs";

const COMPONENT_MAP = {
  creditscore: { component: CreditScore },
  features: { component: Features },
  buddyloan: { component: BuddyLoan },
  personalloan: { component: PersonalLoan },
  eligibilitycheck: { component: EligibilityCheck },
  quickloans: { component: QuickLoans, props: {} },
  emicalculator: { component: EmiCalculator },
};

const rootInstances = new Map();

async function fetchData() {
  const res = await fetch(`${ConfigData.blogAPI}/pages/21798`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

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

function updateClasses() {
  const elements = [
    { selector: "h3", classes: ["my-2", "text-lg", "font-semibold"] },
    { selector: "h2", classes: ["my-2", "text-xl", "font-bold"] },
    { selector: ".content ul", classes: ["list-disc", "pl-5", "space-y-2"] },
  ];

  elements.forEach(({ selector, classes }) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.className = "";
      el.classList.add(...classes);
    });
  });

  document.querySelectorAll("table").forEach((table) => {
    table.className = "";
    table.classList.add(
      "min-w-full",
      "table-auto",
      "border-collapse",
      "border",
      "border-gray-200",
      "odd:bg-gray-100",
      "even:bg-white",
      "py-8"
    );

    table.querySelectorAll("th, td").forEach((th) => {
      th.classList.add("border", "border-gray-200", "px-4", "py-2", "text-center", "my-8");
    });

    const firstRow = table.querySelector("tr");
    if (firstRow) {
      firstRow.classList.add("bg-blue-200");
    }

    const rows = table.querySelectorAll("tr");
    if (rows.length > 5) {
      for (let i = 5; i < rows.length; i++) {
        rows[i].classList.add("hidden");
      }

      const readMoreButton = document.createElement("button");
      readMoreButton.textContent = "Read More";
      readMoreButton.classList.add("mt-2", "text-blue-500", "cursor-pointer");

      readMoreButton.addEventListener("click", () => {
        const hiddenRows = table.querySelectorAll("tr.hidden");
        hiddenRows.forEach((row) => row.classList.remove("hidden"));
        readMoreButton.textContent = "Read Less";
        readMoreButton.classList.add("read-less");

        readMoreButton.addEventListener("click", () => {
          for (let i = 5; i < rows.length; i++) {
            rows[i].classList.add("hidden");
          }
          readMoreButton.textContent = "Read More";
          readMoreButton.classList.remove("read-less");
        });
      });

      table.parentNode.insertBefore(readMoreButton, table.nextSibling);
    }
  });
}

export default function Page() {
  const [faqData, setFaqData] = useState();
  const [calcLoopData, setCalLoopData] = useState();
  const [expandedSection, setExpandedSection] = useState(null);
  const [post, setPost] = useState(null);
  const [loopType, setLoopType] = useState(null);
  const [calcBanner, setCalcBanner] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPost = await fetchData();
        setPost(fetchedPost);
        setFaqData(fetchedPost.faq_data);
        setCalLoopData(fetchedPost.calculator_loop.details);
        setLoopType(fetchedPost.loan_types);
        setCalcBanner(fetchedPost.acf);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!post) return;

    setTimeout(updateClasses, 100);

    const transformedContent = replacePlaceholders(post.content.rendered);
    const container = document.getElementById("dynamic-content");

    if (container) {
      container.innerHTML = transformedContent;
      Object.entries(COMPONENT_MAP).forEach(([tag, { component: Component, props = {} }]) => {
        container.querySelectorAll(`[id^="${tag}-component"]`).forEach((placeholder) => {
          if (!rootInstances.has(placeholder)) {
            const root = ReactDOM.createRoot(placeholder);
            rootInstances.set(placeholder, root);
          }
          rootInstances.get(placeholder).render(<Component {...props} />);
        });
      });
    }

    return () => {
      rootInstances.forEach((root) => root.unmount());
      rootInstances.clear();
    };
  }, [post]);

  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  return (
    <>
      <div className="mt-10 flex min-h-80 items-center justify-center bg-gray-200 px-12">
        <h1 className="text-5xl font-semibold text-bl-blue">{post?.title.rendered || ''}</h1>
      </div>

      <CalculatorLoop data={calcLoopData} />
      {post ? (
        <div id="dynamic-content" className="mx-auto w-11/12 py-4" />
      ) : (
        <p>Loading...</p>
      )}
      <LoopType data={loopType} />
      <FaqSection faqData={faqData} />
    </>
  );
}
