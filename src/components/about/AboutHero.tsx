"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowDown } from "lucide-react";

export const AboutHero = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Hero Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/optimized/about-us.png"
          alt="MaiRii Heritage Jewellery"
          fill
          priority
          className="object-cover object-[center_35%] brightness-95"
        />
        {/* Luxury Vignette & Soft Gradient Overlays */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" /> */}
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C4A064]/20 border border-[#C4A064]/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-amber-300 font-bold">
                MaiRii — &ldquo;For You, Ma&rdquo;
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight">
              Every Woman <br />
              <span className="italic font-light text-amber-300 font-serif">Carries A Story</span>
            </h1>

            <p className="text-base sm:text-xl font-light text-stone-200 leading-relaxed font-serif max-w-2xl">
              From a little girl&apos;s quiet promise to a celebration of womanhood. Discover the heart, legacy, and purpose behind MaiRii.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              
              <Link
                href="/category/necklaces"
                className="px-8 py-4 border border-white/40 hover:border-amber-300 text-white hover:text-amber-300 text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm backdrop-blur-sm transition-all duration-300"
              >
                Explore Collections
              </Link>
            </div>
          </motion.div> */}
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-medium">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-amber-300" />
      </motion.div>
    </section>
  );
};
