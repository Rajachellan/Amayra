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
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      /* Cloudflare R2 public bucket (pub-*.r2.dev and custom hostnames) */
      {
        protocol: "https",
        hostname: "*.r2.dev",
        pathname: "/**",
      },
      /* Legacy Cloudflare Pages–hosted assets */
      {
        protocol: "https",
        hostname: "*.pages.dev",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;