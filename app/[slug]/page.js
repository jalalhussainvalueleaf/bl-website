"use client";

import React, { useEffect, useState } from "react";
import Breadcrum from "@/components/Breadcrum/page";
import LottieAni from "@/public/lottie/business.json";
import Lottie from "@/utils/Lottie";
import QuickLoans from "@/components/Blogs/QuickLoans";
import EligibilityCheck from "@/components/Blogs/EligibilityCheck";
import FaqSection from "@/components/Common/FaqSection";
import { loanSections, accordionData, blogContent } from "@/utils/data";
import ConfigData from "@/config";
import SEOPage from "@/components/SEOPages/Seo";
import BlogContent from "@/components/Blogs/BlogContent";

// Fetch data from the API
async function fetchData(slug) {
  const res = await fetch(`${ConfigData.blogAPI}/seo?slug=${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data[0];
}

export default function Page({ params }) {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loanType, setLoanType] = useState();
  const [faqData, setFaqData] = useState();
  const [expandedSection, setExpandedSection] = useState(null);

  const { slug } = params;

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await fetchData(slug);
        setPost(data);
        setFaqData(data.faq_data);
        setLoanType(data.loan_types);
        setTitle(data.title.rendered);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  if (loading) {
    return (
      <div className="mt-28 h-screen text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mt-28 h-screen text-center">
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <div>
      <Breadcrum />
      <div className="grid grid-cols-2">
        <div>
          <Lottie data={LottieAni} loop={true} />
        </div>
        <SEOPage data={post} />
      </div>
      <div className="mx-auto w-11/12">
        <BlogContent content={post.acf.after_banner_paragraph} title={title} />
      </div>
      <div className="mx-auto flex w-11/12 flex-wrap">
        {loanType &&
          loanType.map((section, index) => (
            <div key={index} className="mb-6 w-full px-4 md:w-1/3">
              <div className="rounded-lg border bg-gray-50 shadow-sm">
                <div className="border-b">
                  <button
                    className="flex w-full items-center justify-between bg-slate-200 p-4 text-left hover:bg-slate-300 focus:outline-none"
                    onClick={() => toggleSection(index)}
                    aria-expanded={expandedSection === index}
                    aria-controls={`section-${index}`}
                  >
                    <h3 className="text-lg font-semibold">{section.name}</h3>
                    <span className="text-xl">
                      {expandedSection === index ? "-" : "+"}
                    </span>
                  </button>
                </div>
                {expandedSection === index && (
                  <div className="p-4">
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
      <div className="mx-auto w-11/12">
        <h2 className="mt-3 text-2xl font-bold">FAQs on Business Loan</h2>
        <FaqSection faqData={faqData} />
      </div>
    </div>
  );
}
