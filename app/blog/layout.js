import React from "react";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
export default function App({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
