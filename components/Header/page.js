"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuData, menuItems } from "@/utils/data";

export default function Header() {
  const [isMegaMenuVisible, setMegaMenuVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div>
      <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/buddyloan-logo.png"
              className="h-10 w-auto"
              alt="Buddy Loan"
              width={100}
              height={200}
            />
          </Link>
          <button
            data-collapse-toggle="navbar-multi-level"
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-multi-level"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="flex w-9/12 justify-between" id="navbar-multi-level ">
            <ul className=" mt-0 flex flex-col space-x-2 font-medium  md:flex-row rtl:space-x-reverse">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="relative p-4"
                  onMouseEnter={() =>
                    item.type === "dropdown" && setMegaMenuVisible(true)
                  }
                  onMouseLeave={() =>
                    item.type === "dropdown" && setMegaMenuVisible(false)
                  }
                >
                  {item.type === "dropdown" ? (
                    <>
                      <button className="flex w-full items-center justify-between px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">
                        {item.label}
                        <svg
                          className="ms-2.5 size-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      {isMegaMenuVisible && (
                        <div className="absolute left-0 top-full z-10 w-48 divide-y divide-gray-100 bg-white shadow-lg dark:divide-gray-600 dark:bg-gray-700">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            {item.data.map((loan, idx) => (
                              <li
                                key={idx}
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative"
                              >
                                <button className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                  {loan.label}
                                  {loan.subMenu && (
                                    <svg
                                      className="ms-2.5 size-2.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 10 6"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                      />
                                    </svg>
                                  )}
                                </button>
                                {loan.subMenu && hoveredIndex === idx && (
                                  <div className="absolute left-full top-0 z-20 mt-2 w-44 divide-y divide-gray-100 bg-white shadow-lg dark:divide-gray-600 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                      {loan.subMenu.map((subItem, subIdx) => (
                                        <li key={subIdx}>
                                          <Link
                                            href={subItem.href}
                                            className="block px-4 py-2 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                          >
                                            {subItem.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                    >
                      {item.label}
                      {item.badge && item.badge}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="ml-4 flex items-center justify-center gap-4">
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
        </div>
      </nav>
    </div>
  );
}
