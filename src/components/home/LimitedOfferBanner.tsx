"use client";

import React from "react";
import { motion } from "framer-motion";

export const LimitedOfferBanner = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative py-12 px-10 rounded-[32px] overflow-hidden"
        >
          {/* Double Gold Border Frame */}
          <div className="absolute inset-0 border border-champagne/40 rounded-[32px] m-1" />
          <div className="absolute inset-0 border border-champagne/20 rounded-[32px] m-3" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10">
            <div className="space-y-3">
              <span className="text-champagne uppercase tracking-[0.6em] text-[10px] font-bold block">
                Seasonal Invitation
              </span>
              <h2 className="text-foreground text-3xl md:text-5xl font-serif leading-tight">
                Flat <span className="italic font-serif-alt text-foreground/80">20% Off</span> on Bridal Collection
              </h2>
              <p className="text-foreground/40 text-[11px] uppercase tracking-[0.2em] font-light">
                Handcrafted masterpieces for your most sacred moments.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button className="px-14 py-6 rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:bg-champagne hover:scale-105 active:scale-95 shadow-xl">
                Claim Privilege
              </button>
            </div>
          </div>

          {/* Abstract Gold Glows - REMOVED blurs */}
          <div className="absolute -top-1/2 -left-1/4 w-[500px] h-[500px] bg-champagne/5 rounded-full pointer-events-none" />
          <div className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] bg-champagne/5 rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};
