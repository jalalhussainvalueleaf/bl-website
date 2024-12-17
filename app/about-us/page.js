"use client";
import React from "react";
import Link from "next/link";
import { WhyChooseUs } from "@/utils/data";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
// import FaqSection from "@/components/Common/FaqSection";
import FaqSection from "@/components/Common/FaqSection";
import { AboutFAQ } from "@/utils/data";

export default function page() {
  return (
    <div className="mt-20">
      <div className="grid grid-cols-2 bg-white">
        <div className="flex flex-col items-center justify-center bg-gray-100 bg-[url('/images/buddyloanlogo.png')] bg-contain bg-center bg-no-repeat">
          <h2 className="text-4xl">Happy Time</h2>
          <h2 className="text-4xl">with Buddy Loan</h2>
        </div>
        <div>
          <div className="flex h-[400px] flex-col items-center justify-center bg-gray-200">
            <h2 className="py-4 text-3xl">Get a Loan Instantly</h2>
            <Link
              href="/"
              className="rounded border bg-bl-blue px-12 py-4 text-xl text-white hover:border-bl-blue hover:bg-white hover:text-bl-blue"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto py-8">
        <div className="mx-auto w-11/12">
          <p className="text-gray-500">
            Buddy Loan is the Digital Fintech Marketplace facilitating loan
            services for all eligible age groups. We make way for quick loan
            approvals and are recognised with one of the highest approval rates
            in the industry!
          </p>
          <p className="py-4 text-gray-500">
            We work with a vision to break financial barriers and to make loans
            easily accessible to all. Our instant loan app provides borrowers
            easy access to loans for their financial needs from our enlisted
            verified lenders.
          </p>
          <p className="py-4 text-gray-500">
            Our services reach beyond continents and deliver unique financial
            solutions.
          </p>
          <h2 className="text-3xl font-semibold">Our Mission </h2>
          <p className="py-4 text-gray-500">
            &quot;Facilitate swift and hassle-free loan approvals, empowering
            individuals and businesses to achieve their financial goals; one
            approval at a time&quot;{" "}
          </p>
          <p className="py-4 text-gray-500">
            Our commitment to financial inclusion and customer-centric service
            drives us to provide unique loan services that help people achieve
            their dreams and aspirations{" "}
          </p>
          <h2 className="text-3xl font-semibold">
            Our Services In Line (What We DO!)
          </h2>
          <p className="py-4 text-gray-500">
            Buddy Loan is a Digital Fintech Marketplace. Our range of loan
            services caters to various financial purposes, such as medical
            expenses, education, travel, debt consolidation, or any other
            financial needs.{" "}
          </p>
          <p className="py-4 text-gray-500">
            <span className="font-semibold">Disclaimer:</span> To get the most
            accurate and up-to-date information on the loan services offered by
            Buddy Loan, stay tuned!
          </p>
          <h2 className="text-3xl font-semibold">
            How We Stand Out as a Digital Fintech Marketplace
          </h2>
          <p className="py-4 text-gray-500">
            Now more than ever, it is easier to get a personal loan from an
            approved list of verified lenders. We have helped bridge the gap
            between many lenders and borrowers with quick approval rates and
            completely transparent unsecured loan journeys.{" "}
          </p>
        </div>
        <div className="mx-auto my-12 w-11/12 bg-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="text-left">
                  <td className="border border-gray-300 p-4">
                    In the market <br />
                    since 2019
                  </td>
                  <td className="border border-gray-300 p-4">
                    2 million Daily <br />
                    Active Users
                  </td>
                  <td className="border border-gray-300 p-4">
                    17 M+ Daily <br />
                    Applications &amp; Growing
                  </td>
                  <td className="border border-gray-300 p-4">
                    1 billion soft <br />
                    loan approvals to date
                  </td>
                  <td className="border border-gray-300 p-4">
                    80% Approval rate
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-100 py-12">
          <div className="mx-auto w-11/12">
            <h2 className="py-4 text-3xl font-semibold">Our Journey</h2>

            <div className="relative border-l border-gray-300">
              {/* <!-- 2019 --> */}
              <div className="mb-10 ml-6">
                <div className="absolute -left-3 size-6 rounded-full border-2 border-white bg-blue-500"></div>
                <p className="text-sm text-gray-500">2019</p>
                <h4 className="text-lg font-semibold text-gray-800">
                  A Customer Ally Emerges
                </h4>
                <p className="text-gray-600">
                  Our simplified financial solution took shape as the customer
                  ally and became the fastest-growing Digital Fintech
                  Marketplace.
                </p>
              </div>

              {/* <!-- 2020 --> */}
              <div className="mb-10 ml-6">
                <div className="absolute -left-3 size-6 rounded-full border-2 border-white bg-green-500"></div>
                <p className="text-sm text-gray-500">2020</p>
                <h4 className="text-lg font-semibold text-gray-800">
                  Exponential Growth
                </h4>
                <p className="text-gray-600">
                  The exponential growth outperformed the industry yardstick and
                  redefined numbers with the platform&quot;s efficiency—the
                  substantial demand for innovative loan solutions shot up this
                  particular year.
                </p>
              </div>

              {/* <!-- 2022 --> */}
              <div className="mb-10 ml-6">
                <div className="absolute -left-3 size-6 rounded-full border-2 border-white bg-yellow-500"></div>
                <p className="text-sm text-gray-500">2022</p>
                <h4 className="text-lg font-semibold text-gray-800">
                  Global Expansion
                </h4>
                <p className="text-gray-600">
                  Buddy Loan&quot;s global expansion ensured a significant
                  presence in the United States. Our solutions made a unique
                  comeback in the loan marketplace & Digital Fintech
                  Marketplace.
                </p>
              </div>

              {/* <!-- 2023 --> */}
              <div className="mb-10 ml-6">
                <div className="absolute -left-3 size-6 rounded-full border-2 border-white bg-purple-500"></div>
                <p className="text-sm text-gray-500">2023</p>
                <h4 className="text-lg font-semibold text-gray-800">
                  Soft Loan Approvals
                </h4>
                <p className="text-gray-600">
                  Buddy Loan made soft loan approval the norm by surpassing 30M+
                  app downloads in India.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12">
          <div>
            <h2 className="py-4 text-3xl font-semibold">
              Why Choose Us/ Features
            </h2>
            <p className="text-gray-500">
              Business loans in India help fuel growth, offer flexibility, and
              aid cash flow management for businesses. Timely repayments enhance
              credit history and future financing options.
            </p>
          </div>

          <div>
            <div className="gap- mx-auto grid w-11/12 grid-cols-3">
              {WhyChooseUs.map((items, index) => (
                <div
                  className=" flex flex-col items-center bg-white p-6"
                  key={index}
                >
                  <img src={items.img} className="w-28 py-4" />
                  <h5 className="mb-2 text-center text-xl font-normal tracking-tight text-bl-blue dark:text-white">
                    {items.title}
                  </h5>
                  <p className="mb-3 h-14 text-center font-normal text-gray-500 dark:text-gray-400">
                    {items.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12">
          <p className="text-gray-500">
            Testimonials from satisfied customers:{" "}
            <Link className="text-bl-blue" href="/">
              video-testimonials
            </Link>
          </p>
        </div>
        <div className="mx-auto w-11/12">
          <h2 className="py-4 text-3xl font-semibold">Contact Us:</h2>
          <p>
            For assistance or more information about personal loans and to
            address concerns, please contact us at info@buddyloan.com.
          </p>

          <div>
            <p className="font-semibold">You Can Connect over :</p>
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
          <div className="my-4 font-semibold">Download App:</div>
          <div className="flex items-center  gap-4">
            <Link
              href="https://play.google.com/store/apps/details?id=com.buddyloan.vls&referrer=utm_source%3DWebsite%26utm_medium%3DDownloadButton"
              className=""
              target="_blank"
            >
              <img src="/images/playstore_btn.png" className="w-40" />
            </Link>
            <Link
              href="https://apps.apple.com/in/app/buddy-loan-personal-loan/id1552911697?utm_medium=DownloadButton&utm_source=SEO&utm_campaign=bl2&la=1"
              className=""
              target="_blank"
            >
              <img src="/images/appstore_btn.png" className="w-40" />
            </Link>
          </div>
        </div>

        <div className="mx-auto my-10 max-w-screen-xl p-4">
          <h2 className="mb-6 text-center text-3xl font-bold text-[#47B6F2]">
            Frequently Asked Questions
          </h2>
          <FaqSection faqData={AboutFAQ} />
        </div>
      </div>
    </div>
  );
}
