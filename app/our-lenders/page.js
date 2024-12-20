"use client";
import React, { useEffect, useState } from "react";
import ConfigData from "@/config";

// Fetch data from the API
async function fetchData() {
  const res = await fetch(`${ConfigData.blogAPI}/pages/21550`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data; // Return the entire array of data
}

export default function Page() {
  const [post, setPost] = useState(null);
  const [partnerImages, setPartnerImages] = useState([]); // Initialize with an empty array
  const [partnerDetails, setPartnerDetails] = useState([]); // Initialize with an empty array

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPost = await fetchData();
        console.log("Fetched Post:", fetchedPost.acf_partners); // Log to debug
        setPartnerImages(fetchedPost.acf_partners.images || []); // Set images safely
        setPartnerDetails(fetchedPost.acf_partners.details || []); // Set images safely
        setPost(fetchedPost); // Set the post data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    loadData();
  }, []); // Run once when the component mounts

  return (
    <div className="mx-auto mt-40 w-10/12">
      {post ? (
        <div>
          <div>
            {partnerImages.length > 0 ? (
              <div className="grid grid-cols-4 ">
                {partnerImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center border p-4"
                  >
                    <img
                      src={imageUrl}
                      alt={`Partner Image ${index + 1}`}
                      className="w-40"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No partner images available</p>
            )}
          </div>
          <div className="py-8">
            <p>
              Buddy Loan is a Digital Fintech Marketplace offering convenient
              access to diverse loan options, allowing you to compare rates,
              terms, and eligibility. We guide you through the process and help
              you access the financial resources you require. Buddy Loan’s
              network of trusted verified lenders improves your chances of
              securing the right personal loan.
            </p>

            <p className="pt-4">
              Here are our leading verified Lenders you can connect with on
              Buddy Loan:
            </p>
          </div>
          <div>
            {partnerDetails.length > 0 ? (
              <div className="">
                {partnerDetails.map((items, index) => (
                  <div key={index} className="pb-4">
                    <a href={items.url} className="flex gap-4 font-semibold">
                      {" "}
                      {index + 1}
                      <h2 className="">{items.title}</h2>
                    </a>
                    <p dangerouslySetInnerHTML={{ __html: items.textarea }} />
                  </div>
                ))}
              </div>
            ) : (
              <p>data not available</p>
            )}
          </div>
          <h1>{post.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
