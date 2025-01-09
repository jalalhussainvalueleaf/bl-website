"use client";

import React, { useEffect, useState } from "react";
import ConfigData from "@/config";

export default function Navigation({ searchTerm, setSearchTerm, setCategory }) {
  const blogURL = `${ConfigData.blogAPI}/categories?per_page=100`;

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(blogURL);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [blogURL]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (slug) => {
    setCategoryName(slug);
    setCategory(slug);
  };

  return (
    <div className="w-3/12 px-4">
      <div className="flex w-full">
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          className="me-1 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 md:hidden"
        >
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <div className="relative hidden w-full md:block">
          <input
            type="text"
            id="search-navbar"
            className="block h-12 w-full border border-gray-300 bg-gray-50 p-2 ps-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="mt-4 h-[700px] overflow-scroll">
        <ul className="space-y-1 sticky top-0">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`cursor-pointer border py-2 ${
                category.id === categoryName
                  ? "rounded-lg bg-bl-blue p-4 text-white"
                  : "rounded-lg bg-white p-4 hover:text-bl-blue"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
