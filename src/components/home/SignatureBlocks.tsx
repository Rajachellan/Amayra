"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const COLLECTIONS = [
  {
    title: "The Heritage Suite",
    subtitle: "A Legacy of Perfection",
    description: "Inspired by the royal courts of ancient India, our Heritage collection blends traditional craftsmanship with timeless silhouettes.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    link: "/category/bridal",
    bgColor: "bg-blush",
    align: "left"
  },
  {
    title: "Daily Elegance",
    subtitle: "Subtle & Sophisticated",
    description: "Designed for the modern woman who seeks luxury in every moment. Minimalist designs crafted in 18k rose gold.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop",
    link: "/category/daily",
    bgColor: "bg-sage",
    align: "right"
  }
];

export const SignatureBlocks = () => {
  return (
    <section className="py-0 overflow-hidden">
      {COLLECTIONS.map((col, index) => (
        <div key={col.title} className={`flex flex-col ${col.align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"} min-h-[600px]`}>
          {/* Image Block */}
          <div className="lg:w-1/2 relative min-h-[500px] overflow-hidden">
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </div>

          {/* Text Block */}
          <div className={`lg:w-1/2 ${col.bgColor} flex items-center justify-center p-12 lg:p-24 relative`}>
             {/* Floating decorative text for magazine feel */}
             <span className="absolute top-10 right-10 text-[120px] font-serif opacity-[0.03] select-none pointer-events-none uppercase">
                {col.title.charAt(0)}
             </span>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-md text-center lg:text-left"
            >
              <span className="text-champagne uppercase tracking-[0.4em] text-[10px] font-medium mb-6 block">
                {col.subtitle}
              </span>
              <h2 className="text-foreground text-4xl md:text-5xl font-serif mb-8 leading-tight">
                {col.title}
              </h2>
              <p className="text-foreground/60 text-sm md:text-base font-light leading-relaxed mb-12 tracking-wide font-serif-alt">
                {col.description}
              </p>
              <Link
                href={col.link}
                className="group inline-flex items-center space-x-4"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-foreground group-hover:text-champagne transition-colors">Discover Series</span>
                <div className="w-12 h-px bg-foreground group-hover:w-20 group-hover:bg-champagne transition-all duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
};
