"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { footerLinks } from "@/utils/data";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false); // Initially hide the footer
  const [scrollPosition, setScrollPosition] = useState(null); // Initialize as null to detect first scroll

  const hideBar = () => {
    sessionStorage.setItem("footerBar", true);
    setIsVisible(false); // Hide immediately when the bar is clicked
    console.log("applied");
  };

  useEffect(() => {
    const footerCheck = sessionStorage.getItem("footerBar");
    if (footerCheck) {
      setIsVisible(false);
      // Reset visibility after 30 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        console.log("removed");
        sessionStorage.removeItem("footerBar");
      }, 30000); // 30 seconds in milliseconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or effect re-run
    }
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      // Only update visibility after the first scroll
      if (scrollPosition !== null) {
        // Show when scrolled down past 60% of screen height
        if (currentScroll > windowHeight * 0.6) {
          setIsVisible(true);
        }
        // Hide when scrolling up
        else if (currentScroll < scrollPosition) {
          setIsVisible(false);
        }
      }

      setScrollPosition(currentScroll); // Update the scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div
      className={`z-50 ${isVisible ? "min-h-[85vh]" : "min-h-[50vh]"} border-t-2 bg-[#E3F2FD] pt-4`}
    >
      <div className="grid lg:grid-cols-5">
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
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
              <Link href="https://www.linkedin.com/company/buddyloan">
                <FaLinkedinIn
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
              <Link href="https://www.facebook.com/buddyloan">
                <FaFacebookF
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
              <Link href="https://www.instagram.com/buddyloanofficial/">
                <IoLogoInstagram
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
              <Link href="https://www.youtube.com/channel/UCzDF0mUNoPV5Sx7IIL0ATTQ">
                <AiOutlineYoutube
                  size={30}
                  className="rounded-sm bg-bl-blue fill-white p-1"
                />
              </Link>
            </div>
          </div>
        </div>
        {footerLinks.map((section, index) => (
          <div key={index} className={` p-2`}>
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
      </div>
      <div className="w-full text-center">
        <p>
          CIN No: U74300KA2019PTC127853 © 2019 Bvalue Services Pvt. Ltd. All
          Rights Reserved.
        </p>
      </div>
      <div className="flex h-20 items-center justify-center gap-4 bg-bl-blue text-center">
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
        className={`border-t-2 shadow-lg transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } fixed bottom-0 left-0 z-[1001] w-full`}
      >
        <div className="flex items-center justify-center gap-20 bg-[#E3F2FD]">
          <div>
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
              className="rounded-full bg-bl-blue px-8 py-4 font-semibold text-white"
            >
              Apply Now
            </Link>
          </div>
        </div>
        <div
          className="absolute -top-0 right-0 flex size-6 cursor-pointer items-center justify-center rounded-full bg-bl-blue text-white"
          onClick={() => hideBar()}
        >
          X
        </div>
      </div>
    </div>
  );
}
