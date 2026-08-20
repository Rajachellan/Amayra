"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles, Shield, Gift } from "lucide-react";

export const BrandStory = () => {
  return (
    <section className="py-10 md:py-10 bg-[#FAF8F3] relative overflow-hidden">
      {/* Decorative filigree pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 border-r border-t border-[#C4A064]/20 rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 border-l border-b border-[#C4A064]/20 rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* <span className="text-[10px] uppercase tracking-[0.5em] text-[#C4A064] font-bold mb-4 block">
              ABOUT US : ORIGIN & VISION
            </span> */}
            <h2 className="text-4xl md:text-6xl font-serif text-[#2B2B2B] leading-tight mb-6">
              Rooted in Love, <br />
              <span className="italic font-light text-[#C4A064]">Crafted for Generations</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#C4A064] mx-auto mb-6" />
            <p className="text-xl md:text-2xl font-serif italic text-[#3D3934]">
              &ldquo;Every woman carries a story in her jewellery box — Mairii begins with ours.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Grid Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/images/pexels-dandu-16612609.jpg"
                  alt="Mairii Heritage & Bangles"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-md backdrop-blur-md bg-black/30 border border-white/20">
                  <p className="font-serif italic text-sm text-amber-200">
                    &ldquo;For You, Ma — a quiet promise written in gold and memories.&rdquo;
                  </p>
                </div>
              </div>
              {/* Decorative Frame Offset */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-[#C4A064]/40 rounded-lg -z-10" />
            </motion.div>
          </div>

          {/* Narrative Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-[#4A4A4A] text-base md:text-lg font-light leading-relaxed font-serif"
            >
              <p className="">
                Long before it was a brand, it was a little girl named Bandana, watching her mother get ready, captivated by the glint of her bangles and her smile that reflected beauty and strength in just one glance.
              </p>

              <p>
                That fascination never left her — it grew into a quiet promise: one day, she&apos;d build something that let every woman feel that same wonder.It started as MaiRii, "mother" in Punjabi — her own quiet way of saying For You, Ma.
              </p>
              <p>
                The name carries that inheritance, rooted in memories: love passed down, one generation to the next.
              </p>

              <p>
                Mairii isn&apos;t just jewellery. It&apos;s the ritual of getting ready, the small joy of catching your reflection and loving yourself.
              </p>

              <p>
                We make that joy accessible — beautifully made imitation jewellery that doesn&apos;t ask you to choose between affordability and elegance.
              </p>

              <p className="text-[#2B2B2B] font-medium">
                What started as one woman&apos;s love for her mother is now an invitation to everyone: come, enjoy a little of that magic for yourself.
              </p>
               <p className="text-xl text-[#2B2B2B] font-normal leading-relaxed border-l-2 border-[#C4A064] pl-6 italic">
              Because at Mairii, we celebrate our legacy along with the expression of our unique identity.
              </p>
            </motion.div>

          
          </div>
        </div>

    
      </div>
    </section>
  );
};
