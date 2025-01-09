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

// Fetch data from the API
async function fetchData() {
  const res = await fetch(`${ConfigData.blogAPI}/pages/21812`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const COMPONENT_MAP = {
  creditscore: CreditScore,
  features: Features,
  buddyloan: BuddyLoan,
  personalloan: PersonalLoan,
  eligibilitycheck: EligibilityCheck,
  quickloans: QuickLoans,
  emicalculator: EmiCalculator,
};

const updateClasses = () => {
  document.querySelectorAll("h3").forEach((h3) => {
    h3.className = "my-2 text-lg font-semibold";
  });
  document.querySelectorAll("h2").forEach((h2) => {
    h2.className = "my-2 text-xl font-bold";
  });
  document.querySelectorAll(".content ul").forEach((ul) => {
    ul.className = "list-disc pl-5 space-y-2";
  });
  document.querySelectorAll("table").forEach((table) => {
    table.className = "min-w-full table-auto border-collapse border border-gray-200 odd:bg-gray-100 even:bg-white py-8";
    table.querySelectorAll("th, td").forEach((th) => {
      th.className = "break-all border border-gray-200 px-4 py-2 text-center w-40";
    });
    const firstRow = table.querySelector("tr");
    if (firstRow) {
      firstRow.classList.add("bg-blue-200", "font-semibold");
    }
    const rows = table.querySelectorAll("tr");
    if (rows.length > 5) {
      for (let i = 5; i < rows.length; i++) {
        rows[i].classList.add("hidden");
      }
      const readMoreButton = document.createElement("button");
      readMoreButton.textContent = "Read More";
      readMoreButton.className = "mt-2 text-blue-500 cursor-pointer";
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
};

export default function Page() {
  const [faqData, setFaqData] = useState();
  const [calcLoopData, setCalLoopData] = useState();
  const [post, setPost] = useState(null);
  const [loopType, setLoopType] = useState(null);
  const [calcBanner, setCalcBanner] = useState(null);
  const rootInstances = new Map();

  useEffect(() => {
    if (!post) return;

    setTimeout(updateClasses, 100);

    const transformedContent = post.content.rendered.replace(/<([a-z]+)><\/\1>/gi, (_, tag) => {
      const lowerTag = tag.toLowerCase();
      if (COMPONENT_MAP[lowerTag]) {
        return `<div id="${lowerTag}-component"></div>`;
      }
      return `<${tag}></${tag}>`;
    });

    const container = document.getElementById("dynamic-content");
    if (container) {
      container.innerHTML = transformedContent;
      Object.entries(COMPONENT_MAP).forEach(([tag, Component]) => {
        container.querySelectorAll(`[id^="${tag}-component"]`).forEach((placeholder) => {
          if (!rootInstances.has(placeholder)) {
            const root = ReactDOM.createRoot(placeholder);
            rootInstances.set(placeholder, root);
          }
          rootInstances.get(placeholder).render(<Component />);
        });
      });
    }

    return () => {
      rootInstances.forEach((root) => root.unmount());
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
        setLoopType(fetchedPost.loan_types);
        setCalcBanner(fetchedPost.acf);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

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
