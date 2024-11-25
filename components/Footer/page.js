"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";

const footerLinks = [
  {
    title: "Loan Types",
    links: [
      {
        href: "https://www.buddyloan.com/personal-loan",
        label: "Personal Loan",
      },
      { href: "https://www.buddyloan.com/instant-loan", label: "Instant Loan" },
      {
        href: "https://www.buddyloan.com/business-loan",
        label: "Business Loan",
      },
      {
        href: "https://www.buddyloan.com/two-wheeler-loan",
        label: "Two-Wheeler Loan",
      },
      { href: "https://www.buddyloan.com/car-loan", label: "Car Loan" },
      {
        href: "https://www.buddyloan.com/marriage-loan",
        label: "Marriage Loan",
      },
      { href: "https://www.buddyloan.com/travel-loan", label: "Travel Loan" },
      { href: "https://www.buddyloan.com/medical-loan", label: "Medical Loan" },
      {
        href: "https://www.buddyloan.com/education-loan",
        label: "Education Loan",
      },
      { href: "https://www.buddyloan.com/home-loan", label: "Home Loan" },
      { href: "https://www.buddyloan.com/gold-loan", label: "Gold Loan" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        href: "https://www.buddyloan.com/privacy-policy",
        label: "Privacy Policy",
      },
      {
        href: "https://www.buddyloan.com/terms-and-conditions",
        label: "Terms & Conditions",
      },
      {
        href: "https://www.buddyloan.com/buddy-score/credit-score",
        label: "Buddy Score",
      },
      {
        href: "https://www.buddyloan.com/calculators",
        label: "Buddy Calculator",
      },
      { href: "https://www.buddyloan.com/buddy-quiz", label: "Buddy Quiz" },
      { href: "https://www.buddyloan.com/buddy-games", label: "Buddy Games" },
      { href: "https://www.buddyloan.com/buddy-cash", label: "Buddy Points" },
      {
        href: "https://www.buddyloan.com/buddyloan-personal-loan-app",
        label: "Buddyloan App",
      },
      {
        href: "https://www.buddyloan.com/our-lenders",
        label: "Our Business Partners",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "https://www.buddyloan.com/about-us", label: "About Us" },
      { href: "https://www.buddyloan.com/features", label: "Features" },
      {
        href: "https://www.buddyloan.com/video-testimonials",
        label: "Testimonials",
      },
      { href: "https://www.buddyloan.com/blog/", label: "Blog" },
      { href: "https://www.buddyloan.com/sitemap", label: "Sitemap" },
      {
        href: "https://www.buddyloan.com/press-release",
        label: "Press Release",
      },
      {
        href: "https://www.buddyloan.com/customer-care",
        label: "Customer Care",
      },
      { href: "https://www.buddyloan.com/faq", label: "FAQ" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "info@buddyloan.com" },
      {
        label:
          "21st Cross Rd, Sector 7, HSR Layout, Bangalore, Karnataka 560102.",
      },
      { label: <img src="/images/creditImage.png" /> },
    ],
  },
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(true); // To control footer visibility
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show when scrolled down past 60% of screen height
      if (currentScroll > windowHeight * 0.6) {
        setIsVisible(true);
      }
      // Hide when scrolling up
      else if (currentScroll < scrollPosition) {
        setIsVisible(false);
      }

      setScrollPosition(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className="z-50 h-[90vh] border-t-2 bg-[#E3F2FD] pt-4">
      <div className="grid grid-cols-6">
        <div className="p-2">
          <div className="flex flex-col items-center justify-center">
            <img src="/images/buddyloanlogo.png" className="h-20" />
            <p>
              With the highest loan approval rate in the industry, Buddy Loan
              offers a solution to each of your financial nuance at your
              fingertip.
            </p>
            <div className="flex w-full gap-2 pt-4">
              <Link href="https://twitter.com/Buddyloan_">
                <RiTwitterXLine
                  size={30}
                  className="bg-bl-blue rounded-sm fill-white p-1"
                />
              </Link>
              <Link href="https://www.linkedin.com/company/buddyloan">
                <FaLinkedinIn
                  size={30}
                  className="bg-bl-blue rounded-sm fill-white p-1"
                />
              </Link>
              <Link href="https://www.facebook.com/buddyloan">
                <FaFacebookF
                  size={30}
                  className="bg-bl-blue rounded-sm fill-white p-1"
                />
              </Link>
              <Link href="https://www.instagram.com/buddyloanofficial/">
                <IoLogoInstagram
                  size={30}
                  className="bg-bl-blue rounded-sm fill-white p-1"
                />
              </Link>
              <Link href="https://www.youtube.com/channel/UCzDF0mUNoPV5Sx7IIL0ATTQ">
                <AiOutlineYoutube
                  size={30}
                  className="bg-bl-blue rounded-sm fill-white p-1"
                />
              </Link>
            </div>
          </div>
        </div>
        {footerLinks.map((section, index) => (
          <div key={index} className={`p-2`}>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <ul>
              {section.links.map((link, idx) => (
                <li key={idx} className={`py-1`}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="text-black hover:underline"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span>{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={`max-w-sm  p-2`}>
          <h3 className="text-lg font-semibold">Sign up for Updates</h3>

          <form className="mx-auto max-w-sm">
            <div className="relative py-4">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="email-address-icon"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="email address"
              />
            </div>
            <button className="bg-bl-blue rounded-full p-2 px-8 text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="w-full text-center">
        <p>
          CIN No: U74300KA2019PTC127853 © 2019 Bvalue Services Pvt. Ltd. All
          Rights Reserved.
        </p>
      </div>
      <div className="bg-bl-blue flex h-20 items-center justify-center gap-4 text-center">
        <div className="flex items-center justify-center gap-4">
          <img src="/images/playstore.png" className="h-8" />
          <p className="font-semibold text-white">Rated 4.5 on Google Play</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <img src="/images/mobile.png" className="h-8" />
          <p className="font-semibold text-white">10M+ App Installs</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <img src="/images/applicant.webp" className="h-8" />
          <p className="font-semibold text-white">
            25M+ Applicants till date & growing
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <img src="/images/man.png" className="h-8" />
          <p className="font-semibold text-white">150K+ Daily Active Users</p>
        </div>
      </div>
      <div
        className={`shadow-lg transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } fixed bottom-0 left-0 w-full`}
      >
        <div className="flex items-center justify-center gap-20 bg-[#E3F2FD]">
          <div className="">
            <img src="/images/loan-approval.webp" className="h-20" />
          </div>
          <div className="px-4 py-6 text-center">
            <p className="text-2xl font-semibold">
              Get Instant Loan Online up to ₹50 Lakhs
            </p>
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex items-center justify-center gap-2">
                <img src="/images/stick_vector.png" className="h-8" />
                <p className="text-sm">Instant Disbursal</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <img src="/images/stick_vector.png" className="h-8" />
                <p className="text-sm">Minimal Documentation</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <img src="/images/stick_vector.png" className="h-8" />
                <p className="text-sm">No Collateral</p>
              </div>
            </div>
          </div>
          <div className="">
            <Link
              href="/"
              className="bg-bl-blue rounded-full px-8 py-4 font-semibold text-white"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
