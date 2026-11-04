import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "192.168.1.6",
    "192.168.1.*",
    "localhost",
    "localhost:3000",
  ],
};

export default nextConfig;
