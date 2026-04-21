"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, RefreshCcw, ScrollText, Users } from "lucide-react";

const features = [
  {
    icon: <Users className="w-6 h-6 stroke-[1]" />,
    title: "VIRTUAL CONCIERGE",
    desc: "Experience personal consulting with our master designers from the comfort of your home."
  },
  {
    icon: <RefreshCcw className="w-6 h-6 stroke-[1]" />,
    title: "LIFETIME MAINTENANCE",
    desc: "Complimentary polishing and stone checking for all Gems of Shree Aarna pieces."
  },
  {
    icon: <ScrollText className="w-6 h-6 stroke-[1]" />,
    title: "AUTHENTICITY GUILD",
    desc: "Every purchase is accompanied by a blockchain-verified digital certificate of origin."
  },
  {
    icon: <Heart className="w-6 h-6 stroke-[1]" />,
    title: "CUSTOM ATELIER",
    desc: "Co-create your dream piece with our craftsmen. Your vision, our hands."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-pearl/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <span className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-4 block">The Advantage</span>
            <h2 className="text-4xl font-serif mb-8">Why Shree Aarna?</h2>
            <p className="text-foreground/60 font-light leading-relaxed mb-10 text-editorial">
              Beyond the gold and gemstones, we provide a service that is as enduring as 
              our jewellery. We are committed to a lifetime of luxury for every client.
            </p>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-white/50 border border-white hover:shadow-2xl hover:shadow-champagne/5 transition-all duration-700 hover:-translate-y-2"
              >
                <div className="text-champagne mb-8">{item.icon}</div>
                <h4 className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-4">{item.title}</h4>
                <p className="text-xs font-light text-foreground/50 leading-loose">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
