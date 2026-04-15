import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ FIX 1: Allow access from other devices
  allowedDevOrigins: ["192.168.6.85"],


  // ✅ FIX 2: Allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;