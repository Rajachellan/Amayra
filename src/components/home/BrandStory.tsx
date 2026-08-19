"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export const BrandStory = () => {
  return (
    <section className="py-24 md:py-32 bg-[#FAF8F3] relative overflow-hidden border-y border-stone-200">
      {/* Decorative center line */}
      <div className="absolute left-1/2 top-0 w-px h-16 bg-gradient-to-b from-[#C4A064] to-transparent -translate-x-1/2" />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[#C4A064] uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">
            ABOUT US : ORIGIN & VISION
          </span>

          <h2 className="text-[#2B2B2B] text-3xl sm:text-5xl md:text-6xl font-serif mb-12 leading-[1.15] tracking-tight">
            Every Woman Carries A Story — <br />
            <span className="italic font-light text-[#C4A064]">MaiRii Begins With Ours</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
            <div className="p-8 rounded-xl bg-white border border-[#C4A064]/15 shadow-sm space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A37F43] block">
                &ldquo;For You, Ma&rdquo;
              </span>
              <p className="text-[#555555] text-sm md:text-base font-light leading-relaxed font-serif">
                Long before it was a brand, it was a little girl named Bandana, watching her mother get ready, captivated by the glint of her bangles and her smile. It started as MaiRii, &ldquo;mother&rdquo; in Punjabi — her quiet way of saying <em>For You, Ma</em>.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border border-[#C4A064]/15 shadow-sm space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A37F43] block">
                Our 10% Social Pledge
              </span>
              <p className="text-[#555555] text-sm md:text-base font-light leading-relaxed font-serif">
                We make the ritual of getting ready accessible with imitation jewellery that balances affordability and elegance. We commit at least 10% of our profits to women&apos;s education, entrepreneurship, skill development, and financial well-being.
              </p>
            </div>
          </div>

          {/* Quote Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block p-8 md:p-12 border border-[#C4A064]/30 bg-white rounded-2xl shadow-xl shadow-[#C4A064]/5 relative group max-w-3xl"
          >
            <p className="text-[#2B2B2B] text-lg sm:text-2xl font-serif italic mb-4 leading-relaxed">
              &ldquo;You deserve to shine, exactly as you are, at every age and every stage of your life.&rdquo;
            </p>
            <span className="text-[#C4A064] text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">
              — Bandana, Founder of MaiRii
            </span>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#2C2A28] text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-[#C4A064] transition-all duration-300 shadow-md group-hover:scale-105"
            >
              Read Full Brand Story
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute left-1/2 bottom-0 w-px h-16 bg-gradient-to-t from-[#C4A064] to-transparent -translate-x-1/2" />
    </section>
  );
};
