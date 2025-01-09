"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfigData from "@/config";

function LandingPage({ searchTerm, category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = `${ConfigData.blogAPI}/posts?_embed&per_page=9&page=${page}`;
        if (category) {
          url += `&categories=${category}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (Array.isArray(result)) {
          setHasMore(result.length === 9);
          setData((prevData) =>
            page === 1 ? result : [...prevData, ...result],
          );
        } else {
          console.error("Expected an array but got:", result);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, category]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const monthAbbreviations = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return `${date.getDate()} ${monthAbbreviations[date.getMonth()]} ${date.getFullYear()}`;
  };

  const stripHTMLAndLimit = (htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 255 ? `${text.substring(0, 255)}...` : text;
  };

  const loadMorePosts = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  const filteredInsights = data.filter((item) =>
    item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const Skeleton = () => (
    <div className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="h-[200px] w-full rounded-t-lg bg-gray-300 md:h-[300px]"></div>
      <div className="p-5">
        <div className="mb-2 h-6 w-3/4 bg-gray-300"></div>
        <div className="h-4 w-full bg-gray-300"></div>
        <div className="mt-2 h-4 w-5/6 bg-gray-300"></div>
        <div className="mt-2 h-4 w-1/2 bg-gray-300"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full md:flex-row">
      <div className="mx-auto grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3 lg:w-full lg:p-8">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} />)
          : filteredInsights.map((item) => (
              <div
                className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
                key={item.id}
              >
                <a href="#">
                  {item._embedded["wp:featuredmedia"]?.[0]?.source_url && (
                    <Image
                      src={item._embedded["wp:featuredmedia"][0].source_url}
                      alt={item.title.rendered}
                      className="h-[200px] w-full rounded-t-lg object-cover md:h-[300px]"
                      width={500}
                      height={300}
                    />
                  )}
                </a>
                <div className="p-5">
                  <h5
                    className="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                  ></h5>
                  <p
                    className="text-sm text-gray-700 dark:text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: stripHTMLAndLimit(item.excerpt.rendered),
                    }}
                  ></p>
                  <p className="text-xs text-gray-500">
                    {formatDateString(item.date)}
                  </p>
                  <Link href={`/blog/${item.slug}`} className="text-custom-red">
                    Read more
                  </Link>
                </div>
              </div>
            ))}
      </div>
      {!loading && hasMore && (
        <div className="flex justify-center pb-12">
          <button
            onClick={loadMorePosts}
            className="rounded-lg bg-bl-blue px-4 py-2 text-white"
          >
            Load More
          </button>
        </div>
      )}
     
    </div>
  );
}

export default LandingPage;
