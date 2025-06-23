import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://api.example.com"
        : "http://localhost:3000",
  },

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
