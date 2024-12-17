/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.buddyloan.com",
      },
      {
        protocol: "http",
        hostname: "docs.buddyloan.com",
      },
      {
        protocol: "https",
        hostname: "www.buddyloan.com",
      },
      {
        protocol: "https",
        hostname: "buddyloan-wordpress-blog.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "buddy-notification-assets.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "vlfalcons.slack.com",
      },
      {
        protocol: "https",
        hostname: "www.prod.buddyloan.com",
      },
      {
        protocol: "http",
        hostname: "65.0.7.233",
      },
    ],
  },
};

export default nextConfig;
