"use client";

import React from "react";
import Image from "next/image";

const HIGHLIGHTS = [
  {
    image: "/aimated-icons/gate.png",
    title: "HANDCRAFTED IN INDIA",
  },
  {
    image:"/aimated-icons/box.png",
    title: "PREMIUM PACKAGING",
  },
  {
    image:"/aimated-icons/shield.png",
    title: "100% SECURE PAYMENTS",
  },
  {
    image: "/aimated-icons/fast-delivery.png",
    title: "PAN INDIA DELIVERY",
  },
  {
    image: "/aimated-icons/heart.png",
    title: "CURATED WITH LOVE",
  },
];

export const PremiumHighlights = () => {
  return (
    <section className="relative w-full bg-[#f6ead9] py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-x-8 md:gap-y-0">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.title}
              className="group flex flex-col items-center justify-center text-center"
            >
              {/* GIF / Image */}
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center md:h-27 md:w-25">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                  sizes="98px"
                />
              </div>

              {/* Title */}
              <h3
                className="
                  max-w-[180px]
                  text-[12px]
                  font-serif
                  font-bold
                  uppercase
                  leading-[1.6]
                  tracking-[0.14em]
                  text-foreground
                  transition-colors
                  duration-300
                  group-hover:text-[#2E5A44]
                  md:text-[18px]
                "
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};