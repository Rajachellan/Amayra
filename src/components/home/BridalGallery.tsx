"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import bridal from "../../assets/bridal_collections/bridal_collections (1).jpg"
import bridal1 from "../../assets/bridal_collections/bridal_collections (5).jpg"
import bridal2 from "../../assets/bridal_collections/bridal.jpg"
import bridal3 from "../../assets/bridal_collections/bridal_collections (8).jpg"
import bridal4 from "../../assets/bridal_collections/bridal_collections (7).jpg"
import bridal5 from "../../assets/bridal_collections/bridal_collections (4).jpg"
import bridal6 from "../../assets/bridal_collections/bridal_3.jpg"
import bridal7 from "../../assets/bridal_collections/nosepin.jpg"
const images = [
  {
    id: 1,
    url: bridal,
    size: "large",
    title: "Signature Traditional",
  },
  {
    id: 2,
    url: bridal1,
    size: "medium",
    title: "Royal Neckpiece",
  },
  {
    id: 3,
    url: bridal2,
    size: "medium",
    title: "Bridal Glow",
  },
  {
    id: 4,
    url: bridal3,
    size: "large",
    title: "The Regal Bride",
  },
  {
    id: 5,
    url: bridal4,
    size: "medium",
    title: "Diamond Radiance",
  },
  {
    id: 6,
    url: bridal6,
    size: "medium",
    title: "Kundan Heritage",
  },
  {
    id: 7,
    url: bridal5,
    size: "medium",
    title: "Kundan Heritage",
  },
  {
    id: 7,
    url: bridal7,
    size: "medium",
    title: "Kundan Heritage",
  },
];

export const BridalGallery = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-brand-gold font-sans font-bold tracking-[0.5em] uppercase text-xs mb-4">
            Visual Storytelling
          </h3>
          <h2 className="text-brand-emerald font-serif text-4xl md:text-6xl mb-6">
            The Bridal Gallery
          </h2>
          <div className="w-24 h-[1px] bg-brand-gold mx-auto" />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group overflow-hidden bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                <Image
                  src={img.url}
                  alt={img.title}
                  width={800}
                  height={1000}
                  className="w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center p-6 border border-white/30 m-6 scale-90 group-hover:scale-100 transition-transform duration-500">
                  <p className="text-white font-serif text-2xl mb-2">{img.title}</p>
                  <p className="text-brand-gold font-sans font-bold text-xs tracking-widest uppercase">
                    View Masterpiece
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
