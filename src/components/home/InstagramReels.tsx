"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const reels = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=500&auto=format&fit=crop",
    title: "Handcrafted Elegance",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=500&auto=format&fit=crop",
    title: "Bridal Glow",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1620914107106-25ed75f10f88?q=80&w=500&auto=format&fit=crop",
    title: "The Golden Hour",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1524231757104-8b8359b3f3e1?q=80&w=500&auto=format&fit=crop",
    title: "Vintage Vibe",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop",
    title: "Jewellery Magic",
  },
];

export const InstagramReels = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h3 className="text-brand-gold font-sans font-bold tracking-[0.4em] uppercase text-xs mb-4">
              Watch & Shop
            </h3>
            <h2 className="text-brand-emerald font-serif text-4xl md:text-5xl">
              Instagram Reels
            </h2>
          </div>
          <button className="text-brand-emerald font-sans font-bold text-sm tracking-widest border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors">
            FOLLOW US @Mairii
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 snap-x">
          {reels.map((reel, idx) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex-shrink-0 w-64 aspect-[9/16] relative group rounded-2xl overflow-hidden cursor-pointer snap-start"
            >
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                  <Play className="text-white fill-white w-5 h-5 ml-1" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-serif text-lg leading-tight">
                  {reel.title}
                </p>
                <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-brand-gold transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
