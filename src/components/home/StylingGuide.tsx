"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import silver1 from "../../assets/silver_collection (1).jpg"
import silver2 from "../../assets/silver_collection (2).jpg"
import silver from "../../assets/silver.jpg"
const stylingTips = [
  {
    id: 1,
    title: "Perfect Layering",
    description: "Combine a 16-inch choker with a 22-inch pendant for a layered look that adds depth to any neckline.",
    image: silver2,
  },
  {
    id: 2,
    title: "Emerald & Gold",
    description: "Pair high-carat gold with deep emeralds. The contrast highlights the natural brilliance of the gemstone.",
    image: silver1,
  },
  {
    id: 3,
    title: "Statement Studs",
    description: "Keep your necklace simple when wearing chandelier earrings to let your face remain the centerpiece.",
    image: silver,
  },
];

export const StylingGuide = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h3 className="text-brand-gold font-sans font-bold tracking-[0.4em] uppercase text-xs mb-4">
            Aspirational styling
          </h3>
          <h2 className="text-brand-emerald font-serif text-4xl md:text-5xl mb-6">
            The Art of Adornment
          </h2>
          <p className="text-gray-500 font-sans tracking-widest text-sm max-w-xl mx-auto uppercase">
            Curated tips from our lead designers on how to wear your Gems of Shree Aarna pieces with effortless elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stylingTips.map((tip, idx) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[4/5] mb-8 overflow-hidden">
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-emerald/20 opacity-40 group-hover:opacity-0 transition-opacity duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="text-white w-6 h-6" />
                </div>
              </div>
              <h4 className="font-serif text-2xl text-brand-emerald mb-4 tracking-wide group-hover:text-brand-gold transition-colors">
                {tip.title}
              </h4>
              <p className="text-gray-500 font-sans text-sm tracking-widest leading-relaxed">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
