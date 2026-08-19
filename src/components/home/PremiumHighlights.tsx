"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HandHeart,
  PackageCheck,
  ShieldCheck,
  Truck,
  Heart,
  Gem,
  Sparkles,
  Crown,
  BadgeCheck,
  Gift,
} from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: HandHeart,
    title: "Handcrafted in India",
  },
  {
    icon: PackageCheck,
    title: "Premium Packaging",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payments",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
  },
  {
    icon: Heart,
    title: "Curated with Love",
  },
  {
    icon: Gem,
    title: "Finest Materials",
  },
  {
    icon: Sparkles,
    title: "Timeless Elegance",
  },
  {
    icon: Crown,
    title: "Royal Craftsmanship",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assured",
  },
  {
    icon: Gift,
    title: "Perfect for Gifting",
  },
];

export const PremiumHighlights = () => {
  return (
    <section className="relative w-full overflow-hidden py-14 md:py-18">
      {/* Soft edge fading */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-32 bg-gradient-to-r from-background to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-32 bg-gradient-to-l from-background to-transparent" />

      {/* Marquee */}
      <div className="flex w-max">
        <motion.div
          className="flex items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {/* First set */}
          <div className="flex items-center">
            {HIGHLIGHTS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={`first-${item.title}`}
                  className="
                    group
                    flex
                    w-[220px]
                    md:w-[260px]
                    flex-shrink-0
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-6
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      mb-6
                      text-[#2E5A44]
                      transition-all
                      duration-700
                      ease-out
                      group-hover:-translate-y-2
                      group-hover:text-champagne
                    "
                  >
                    <Icon
                      className="
                        w-16 h-16
                        md:w-[76px] md:h-[76px]
                        stroke-[1]
                      "
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      max-w-[210px]
                      text-[13px]
                      md:text-[15px]
                      uppercase
                      tracking-[0.18em]
                      leading-[1.7]
                      font-serif
                      font-semibold
                      text-foreground
                      transition-colors
                      duration-500
                      group-hover:text-[#2E5A44]
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={`second-${item.title}`}
                  className="
                    group
                    flex
                    w-[220px]
                    md:w-[260px]
                    flex-shrink-0
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-6
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      mb-6
                      text-[#2E5A44]
                      transition-all
                      duration-700
                      ease-out
                      group-hover:-translate-y-2
                      group-hover:text-champagne
                    "
                  >
                    <Icon
                      className="
                        w-16 h-16
                        md:w-[76px] md:h-[76px]
                        stroke-[1]
                      "
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      max-w-[210px]
                      text-[13px]
                      md:text-[15px]
                      uppercase
                      tracking-[0.18em]
                      leading-[1.7]
                      font-serif
                      font-semibold
                      text-foreground
                      transition-colors
                      duration-500
                      group-hover:text-[#2E5A44]
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};