"use client";

import React, { useEffect, useState, useCallback } from "react";
import Breadcrum from "@/components/Breadcrum/page";
import LottieAni from "@/public/lottie/business.json";
import Lottie from "@/utils/Lottie";
import SEOPage from "@/components/SEOPages/Seo";
import BlogContent from "@/components/Blogs/BlogContent";
import LoopType from "@/components/Common/LoopType";
import FaqSection from "@/components/Common/FaqSection";
import ConfigData from "@/config";
import NoFound from "@/components/404/page";

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

  const toggleSection = useCallback((sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  }, []);

  if (loading) {
    return (
      <div className="mt-28 h-screen text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error || !post) {
    return (
      <NoFound/>
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
      <LoopType data={loanType} />
      <div className="mx-auto w-11/12">
        <FaqSection faqData={faqData} />
      </div>
    </div>
  );
}
