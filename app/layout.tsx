import type { Metadata } from "next";

import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Header from "../components/Header/page";
import Footer from "../components/Footer/page";

export const metadata: Metadata = {
  title: "Apply For Loan Online Up to 15 Lakhs | Instant Approval | Buddy Loan",
  description:
    "Instant Personal Loan up to 15 Lakhs - Quick cash loan approval & minimum documentation. Easy online application, competitive interest rates, apply on Buddy Loan app now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
