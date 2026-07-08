"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Gem, Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: <Sparkles className="w-10 h-10 stroke-[1]" />,
    title: "Handcrafted",
    description: "Meticulously shaped by master artisans with ancestral precision."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 stroke-[1]" />,
    title: "Certified",
    description: "Every diamond and gold piece carries international hallmarks of purity."
  },
  {
    icon: <Gem className="w-10 h-10 stroke-[1]" />,
    title: "Premium Quality",
    description: "Sourcing only the finest ethically mined gemstones and 22kt pure gold."
  },
  {
    icon: <Award className="w-10 h-10 stroke-[1]" />,
    title: "Timeless Design",
    description: "Masterpieces designed to transcend generations and define legacies."
  }
];

export const PremiumHighlights = () => {
  return (
    <section className="py-32 bg-sage/40 border-y border-foreground/5 relative overflow-hidden">
      {/* Subtle accent glows */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-champagne/10 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-champagne/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 text-center">
          {HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center group"
            >
              <div className="text-champagne mb-5 transition-transform duration-700 group-hover:scale-120">
                {item.icon}
              </div>
              <h3 className="text-foreground text-[15px] uppercase tracking-[0.5em] font-bold mb-5 leading-tight font-serif">
                {item.title}
              </h3>
              <p className="text-foreground/60 text-[13px] font-light leading-relaxed max-w-[200px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative center divider */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-32 h-[1px] bg-champagne/30" />
    </section>
  );
};


