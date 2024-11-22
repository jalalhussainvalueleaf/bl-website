import React from "react";
import BlogContent from "../../../components/Blogs/BlogContent";
import FreeCreditScore from "../../../components/Blogs/FreeCreditScore";

// Function to fetch WordPress content
async function fetchData(slug) {
  const res = await fetch(
    `https://www.buddyloan.com/blog/wp-json/wp/v2/posts?slug=${slug}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data[0];
}

// Replace placeholder <creditscore></creditscore> with a React mount point
function replacePlaceholders(htmlContent) {
  return htmlContent.replace(
    /<creditscore><\/creditscore>/g,
    "<div id='creditscore-component'></div>",
  );
}

// Function to add custom classes to specific HTML tags
function addClassesToTags(htmlContent) {
  return htmlContent
    .replace(/<h2>/g, '<h2 class="text-2xl font-bold mt-4 mb-2">')
    .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-4">')
    .replace(/<p>/g, '<p class="mb-4 text-gray-700">')
    .replace(
      /<table>/g,
      '<table class="table-auto border-collapse w-full mb-4">',
    )
    .replace(/<thead>/g, '<thead class="bg-gray-200 text-gray-800">')
    .replace(/<tbody>/g, '<tbody class="divide-y divide-gray-300">');
}

export default async function Page({ params }) {
  const { slug } = params;

  // Fetch WordPress post content
  const post = await fetchData(slug);

  if (!post) {
    return (
      <div className="mt-28 h-screen text-center">
        <h1>Post not found</h1>
      </div>
    );
  }

  // Replace placeholders in the content
  const transformedContent = addClassesToTags(
    replacePlaceholders(post.content.rendered),
  );

  return (
    <div className="mt-28 flex gap-12 p-8">
      <div className="w-full">
        <h1
          className="mb-4 text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        ></h1>
        <BlogContent content={transformedContent} />
      </div>
      <div className="w-4/12">
        <FreeCreditScore />
      </div>
    </div>
  );
}
