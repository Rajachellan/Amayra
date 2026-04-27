"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import neckles from "../../../public/images/neckles.jpg"

import { useCart } from "@/context/CartContext";

export const ProductSpotlight = () => {
  const { addToCart } = useCart();
  return (
    <section className="py-32 bg-pearl relative overflow-hidden">
      {/* Decorative vertical lettering */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="text-[120px] font-serif italic text-foreground/[0.01] rotate-90 origin-center select-none">
          Signature
        </span>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Text Story Section */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-champagne uppercase tracking-[0.6em] text-[10px] font-bold block">
                  Couture Spotlight
                </span>
                <h2 className="text-foreground text-4xl md:text-6xl font-serif leading-[1.1]">
                  The Imperial <br />
                  <span className="italic font-serif-alt text-[#3D3934]">Kundan Masterpiece</span>
                </h2>
              </div>

              <p className="text-[#3D3934] text-base font-light leading-relaxed max-w-md">
                A symphony of hand-cut polki diamonds and deep emeralds, set in 22kt pure gold. Each stone is meticulously placed using centuries-old heritage kundan techniques, creating a piece that doesn&apos;t just sparkle—it narrates a royal legacy.
              </p>

              <div className="pt-4 flex flex-col space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#6B6661]">Market Value</span>
                  <p className="text-2xl font-serif text-foreground">₹2,45,000</p>
                </div>

                <div className="flex items-center gap-10">
                  <Link
                    href="/product/1"
                    className="px-12 py-5 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-500 hover:bg-champagne hover:scale-105"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => addToCart({
                      id: "spotlight-kundan",
                      name: "Imperial Kundan Masterpiece",
                      price: 245000,
                      image: "/images/luxury/kundan.jpg",
                      category: "Necklaces",
                      description: "A symphony of hand-cut polki diamonds and deep emeralds.",
                      stock: 1,
                    })}
                    className="text-[10px] uppercase tracking-[0.4em] font-semibold text-foreground border-b border-champagne pb-1 hover:text-champagne transition-colors bg-transparent cursor-pointer"
                  >
                    Add to Collection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Large Zoomed Image Section */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square md:aspect-[4/3] rounded-[40px] overflow-hidden group shadow-2xl"
            >
              <Image
                src="/images/luxury/kundan.jpg"
                alt="Imperial Kundan Masterpiece"
                fill
                className=" transition-transform duration-[3s] group-hover:scale-110"
              />

              {/* Corner Frame Accents */}
              <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20 rounded-tl-2xl" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20 rounded-br-2xl" />

              {/* Grain Texture Over Image */}
              <div className="grain-overlay opacity-[0.05]" />

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-champagne/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
