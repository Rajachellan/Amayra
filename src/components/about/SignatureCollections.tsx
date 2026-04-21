"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const collections = [
  {
    title: "Bridal Couture",
    img: "/images/midsection-smiling-young-bride-home.jpg",
    span: "col-span-1 md:col-span-2"
  },
  {
    title: "Temple Gems",
    img: "/images/woman-wears-gold-sari-with-green-gold-jewelry.jpg",
    span: "col-span-1"
  },
  {
    title: "Antique Revival",
    img: "/images/neckles.jpg",
    span: "col-span-1"
  },
  {
    title: "Modern Minimal",
    img: "/images/close-up-details-jewelry-young-attractive-woman-stylish-black-dress-posing-tropical-villa-sexy-elegant-summer-style-fashionable-necklace-accessories.jpg",
    span: "col-span-1 md:col-span-2"
  }
];

export const SignatureCollections = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-4 block">The Collections</span>
            <h2 className="text-4xl font-serif">Signature Eras</h2>
          </div>
          <button className="text-[10px] uppercase tracking-widest font-medium border-b border-champagne pb-1 hover:text-champagne transition-colors">
            View All Series
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative group overflow-hidden cursor-pointer ${item.span} aspect-[16/9] md:aspect-auto h-[400px]`}
            >
              <Image 
                src={item.img} 
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Gold Border Glow */}
              <div className="absolute inset-0 border border-transparent group-hover:border-champagne/40 transition-colors duration-700 pointer-events-none z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              
              <div className="absolute bottom-10 left-10 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <h4 className="text-2xl font-serif text-white mb-2 italic">{item.title}</h4>
                <div className="w-0 h-[1px] bg-champagne group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
