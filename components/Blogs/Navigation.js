"use client";

import React, { useEffect, useState } from "react";
import ConfigData from "@/config";

export default function Navigation({ searchTerm, setSearchTerm, setCategory }) {
  const blogURL = `${ConfigData.blogAPI}/categories?per_page=100`;
  console.log(blogURL);

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(blogURL);
        const data = await response.json();
        console.log("category", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryClick = (slug) => {
    setCategoryName(slug); // Update local state
    setCategory(slug); // Update parent state (if needed)
  };

  return (
    <div className="w-3/12 px-4">
      {/* Search Bar */}
      <div className="flex w-full">
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          className="me-1 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 md:hidden"
        >
          <svg
            className="h-5 w-5"
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
            className="block h-12 w-full border border-gray-300 bg-gray-50 p-2 ps-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="mt-4 h-[500px] overflow-scroll">
        <ul className="space-y-1">
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

      {/* Selected Category */}
      <div className="mt-4">
        {categoryName ? (
          <p className="text-gray-700 dark:text-gray-300">
            {/* Selected Category: <strong>{categoryName}</strong> */}
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No category selected.
          </p>
        )}
      </div>
    </div>
  );
}
