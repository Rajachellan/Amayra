import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ FIX 1: Allow access from other devices
  allowedDevOrigins: ["192.168.6.85"],

  redirects: async () => [
    { source: "/cart", destination: "/?openCart=1", permanent: false },
  ],

  // ✅ FIX 2: Allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;