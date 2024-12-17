"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { menuData, menuItems } from "@/utils/data";
import Logout from "@/utils/logout";

export default function Header() {
  const [isMegaMenuVisible, setMegaMenuVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div>
      <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">
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

          <div className="ml-4 flex items-center justify-center gap-4">
            <Logout />
          </div>
        </div>
      </nav>
    </div>
  );
}
