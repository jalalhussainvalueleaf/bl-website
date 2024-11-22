"use client";
import React, { useState } from "react";
import LandingPage from "../../components/Blogs/LandingPage";
import NavigationBar from "../../components/Blogs/Navigation";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  return (
    <div className="mt-24 flex">
      <LandingPage searchTerm={searchTerm} category={category} />
      <NavigationBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
}
