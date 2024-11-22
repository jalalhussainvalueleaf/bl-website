/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.aarnalaw.com",
      },
      {
        protocol: "https",
        hostname: "aarnalaw.com",
      },
      {
        protocol: "https",
        hostname: "www.aarnalaw.com",
      },
      {
        protocol: "https",
        hostname: "www.buddyloan.com",
      },
      {
        protocol: "https",
        hostname: "buddyloan-wordpress-blog.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
