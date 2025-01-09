"use client";
import React, { useEffect, useState } from "react";
import ConfigData from "@/config";

// Fetch data from the API
async function fetchData() {
  const res = await fetch(`${ConfigData.blogAPI}/pages/21504`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data; // Return the entire array of data
}

export default function Page() {
  const [post, setPost] = useState(null);


  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPost = await fetchData();
        setPost(fetchedPost); // Set the post data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    loadData();
  }, []); // Run once when the component mounts

  return (
<>
<div className="mt-10 flex min-h-80 items-center justify-center bg-gray-200">
        {post ? (
          <h1 className="text-4xl font-bold text-bl-blue">
            {post.title.rendered}
          </h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    <div className="mx-auto w-10/12">

      {post ? (
        <>
        
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
}
