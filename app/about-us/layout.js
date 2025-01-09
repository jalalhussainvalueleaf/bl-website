import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";

export const metadata = {
  title:
    "About Us | Buddy Loan, a Leading Digital Fintech Marketplace for Loans",
  description:
    "Buddy Loan, a leading digital fintech marketplace connecting you with verified lenders. Our mission & commitment is to make borrowing easy and accessible.",
};

export default function App({ children }) {
  return (
    <>
        <Header />
        {children}
        <Footer />
        </>
  );
}
