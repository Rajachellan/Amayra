"use client";

import React from "react";
import { motion } from "framer-motion";

export const BrandStory = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Decorative center line */}
      <div className="absolute left-1/2 top-0 w-px h-1/4 bg-gradient-to-b from-champagne to-transparent -translate-x-1/2" />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-champagne uppercase tracking-[0.5em] text-[10px] font-medium mb-10 block">
            Our Legacy
          </span>

          <h2 className="text-foreground text-4xl md:text-6xl font-serif mb-16 leading-[1.1] tracking-tight">
            Crafting Heritage through <br />
            <span className="italic font-serif-alt">Timeless Artistry</span>
          </h2>

          <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:gap-24 text-left">
            <div className="flex-1 space-y-8">
              <p className="text-foreground/70 text-base md:text-lg font-light leading-relaxed font-serif-alt">
                For over three decades, Mairii has been a custodian of India&apos;s rich jewelry heritage. What began as a small boutique of handcrafted wonders has evolved into a hallmark of luxury, trusted by families across generations.
              </p>
            </div>
            <div className="flex-1 space-y-8">
              <p className="text-foreground/70 text-base md:text-lg font-light leading-relaxed font-serif-alt">
                Our philosophy is simple: we don&apos;t just create jewelry; we weave stories of elegance into every diamond and every gold carving. Every piece in our collection is a testament to the patient hands of our master artisans.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20"
          >
            <div className="inline-block px-12 py-10 border border-foreground/5 bg-pearl relative group overflow-hidden">
              <p className="text-foreground text-xl md:text-2xl font-serif italic mb-6 relative z-10">
                &quot;Luxury is not an indulgence, but an appreciation of the finest details.&quot;
              </p>
              <span className="text-champagne text-[10px] uppercase tracking-[0.4em] relative z-10">
                — The Mairii Ethos
              </span>

              {/* Subtle highlight effect */}
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:inset-full transition-all duration-[1.5s] ease-in-out" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute left-1/2 bottom-0 w-px h-1/4 bg-gradient-to-t from-champagne to-transparent -translate-x-1/2" />
    </section>
  );
};
