"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import neckles from "../../../public/images/neckles.jpg"
const MOODS = [
  {
    id: "bridal",
    title: "Bridal Elegance",
    subtitle: "Sacred vows, timeless brilliance",
    image: "/images/luxury/temple.png",
    color: "bg-pearl",
    href: "/category/bridal",
  },
  {
    id: "everyday",
    title: "Everyday Luxury",
    subtitle: "Defining elegance in every detail",
    image: "/images/neckles.jpg",
    color: "bg-pearl",
    href: "/category/earrings",
  },
  {
    id: "heritage",
    title: "Royal Heritage",
    subtitle: "Majesty captured in heritage gold",
    image: "/images/luxury/lifestyle2.png",
    color: "bg-pearl",
    href: "/category/necklaces",
  },
  {
    id: "minimal",
    title: "Minimal Chic",
    subtitle: "Contemporary brilliance, minimal form",
    image: "/images/luxury/neckles7.jpg",
    color: "bg-pearl",
    href: "/category/silver",
  },
];

export const MoodCategories = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mb-16">
          <span className="text-champagne uppercase tracking-[0.6em] text-[10px] font-bold block mb-4">
            Curated Experiences
          </span>
          <h2 className="text-foreground text-4xl md:text-5xl font-serif">
            Shop by <span className="italic font-serif-alt text-[#3D3934]/90">Mood</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOODS.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-[24px] aspect-[4/5] ${mood.color} border border-foreground/10 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2`}
            >
              <Link href={mood.href} className="block h-full relative">
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <span className="text-champagne uppercase tracking-[0.3em] text-[9px] font-bold mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transition-transform">
                    Discover More
                  </span>
                  <h3 className="text-foreground text-2xl font-serif mb-2 group-hover:text-champagne transition-colors duration-500">
                    {mood.title}
                  </h3>
                  <p className="text-[#6B6661] text-[11px] uppercase tracking-[0.1em] font-medium">
                    {mood.subtitle}
                  </p>
                </div>

                <div className="absolute inset-x-8 top-8 bottom-32 overflow-hidden rounded-[16px]">
                  <Image
                    src={mood.image}
                    alt={mood.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/5 transition-colors" />
                </div>

                {/* Subtle border detail */}
                <div className="absolute inset-4 border border-foreground/10 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
