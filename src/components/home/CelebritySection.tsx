"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import actress1 from "../../assets/actress (1).jpg"
import actress2 from "../../assets/actress (2).jpg"
import actress3 from "../../assets/actress (3).jpg"

const celebrities = [
  {
    name: "Red Carpet Elegance",
    image: actress1,
    magazine: "VOGUE INDIA",
  },
  {
    name: "Bridal Dreams",
    image: actress2,
    magazine: "BAZAAR",
  },
  {
    name: "The Royal Affair",
    image: actress3,
    magazine: "ELLE",
  },
];

export const CelebritySection = () => {
  return (
    <section className="py-24 bg-emerald-soft">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <h3 className="text-brand-gold font-serif italic tracking-[0.3em] text-lg md:text-xl mb-4">
              Our Presence
            </h3>
            <h2 className="text-emerald-dark font-serif text-5xl md:text-6xl mb-8 leading-tight">
              As Seen <br /> On Stars
            </h2>
            <p className="text-gray-600 font-sans text-lg mb-10 leading-relaxed italic">
              "MaiRii's jewellery is not just an accessory; it's a piece of art that makes every woman feel like a queen."
            </p>
            <div className="flex items-center gap-8 grayscale opacity-50">
              <span className="font-serif font-bold text-xl">VOGUE</span>
              <span className="font-serif font-bold text-xl">BAZAAR</span>
              <span className="font-serif font-bold text-xl">ELLE</span>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {celebrities.map((celeb, idx) => (
              <motion.div
                key={celeb.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative aspect-[3/4] overflow-hidden group shadow-xl"
              >
                <Image
                  src={celeb.image}
                  alt={celeb.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-brand-gold text-xs tracking-[0.3em] font-bold uppercase">
                    {celeb.magazine}
                  </span>
                  <h4 className="text-white font-serif text-xl mt-1">{celeb.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
