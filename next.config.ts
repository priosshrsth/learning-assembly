import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
  allowedDevOrigins: ["59c7c11b0c72.ngrok-free.app"],
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lightout-portal.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lightout-portal.*.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
