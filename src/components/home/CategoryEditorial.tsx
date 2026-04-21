"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    title: "Bridal Collection",
    subtitle: "A Royal Heritage",
    description: "Exquisite handcrafted emerald and gold sets designed for the modern royal bride. Every piece tells a story of tradition and elegance.",
    image: "/images/luxury/bridal.png",
    background: "bg-blush",
    href: "/category/bridal",
    align: "left",
  },
  {
    title: "Temple Jewelry",
    subtitle: "Divine Craftsmanship",
    description: "Rediscover the ancient art of temple jewelry, featuring intricate gold carvings of classical motifs and high-grade rubies.",
    image: "/images/luxury/temple.png",
    background: "bg-sage",
    href: "/category/necklaces?sub=Temple",
    align: "right",
  },
  {
    title: "Daily Elegance",
    subtitle: "Minimalist Luxury",
    description: "Delicate necklaces and studs crafted for daily sophistication. Subtle, modern, and timeless pieces for every occasion.",
    image: "/images/luxury/daily.png",
    background: "bg-pearl",
    href: "/category/earrings?sub=Daily Wear",
    align: "left",
  },
];

export const CategoryEditorial = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col space-y-32">
          {CATEGORIES.map((cat, index) => (
            <div 
              key={cat.title} 
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                cat.align === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: cat.align === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full md:w-1/2 relative aspect-[4/5] luxury-shadow"
              >
                <div className={`absolute inset-0 ${cat.background} transform translate-x-4 translate-y-4 -z-10`} />
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="w-full md:w-1/2 flex flex-col items-start"
              >
                <span className="text-champagne uppercase tracking-[0.3em] text-[10px] font-medium mb-4">
                  {cat.subtitle}
                </span>
                <h2 className="text-foreground text-4xl md:text-5xl font-serif mb-6">
                  {cat.title}
                </h2>
                <p className="text-foreground/60 text-base md:text-lg font-light leading-relaxed mb-10 max-w-md">
                  {cat.description}
                </p>
                <Link 
                  href={cat.href}
                  className="group flex items-center space-x-4 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Explore Collection</span>
                  <div className="w-10 h-px bg-champagne transition-all duration-300 group-hover:w-16" />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
