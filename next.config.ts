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
  allowedDevOrigins: ["*.ngrok.free.app"],
};

export default nextConfig;
