"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import bridal from "../../assets/bridal_collections/bridal_collections (3).jpg"
import cocktail from "../../assets/cocktail.jpg"
import dailywear from "../../assets/dailwaer.jpg"
import festive from "../../assets/festival.jpg"
import gifting from "../../assets/gift.jpg"
const occasions = [
  {
    name: "Wedding",
    image: bridal,
    href: "/category/bridal",
  },
  {
    name: "Cocktail",
    image: cocktail,
    href: "/category/all?occasion=Cocktail",
  },
  {
    name: "Daily Wear",
    image: dailywear,
    href: "/category/all?occasion=Daily",
  },
  {
    name: "Festive",
    image: festive,
    href: "/category/all?occasion=Festive",
  },
  {
    name: "Gifting",
    image: gifting,
    href: "/category/all?style=Gift",
  },
];

export const OccasionSection = () => {
  return (
    <section className="py-24 bg-emerald-soft">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-brand-gold font-serif italic tracking-[0.3em] text-lg md:text-xl mb-4">
            Curated Styles
          </h3>
          <h2 className="text-emerald-dark font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Shop by Occasion
          </h2>
          <div className="w-24 h-[1px] bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {occasions.map((occ, idx) => (
            <motion.div
              key={occ.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={occ.href} className="flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] rounded-full overflow-hidden mb-6 shadow-xl border-4 border-white transition-all duration-500 group-hover:border-brand-gold/30 group-hover:shadow-2xl">
                  <Image
                     src={occ.image}
                     alt={occ.name}
                     fill
                     sizes="(max-width: 768px) 50vw, 20vw"
                     className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-emerald-medium/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h4 className="text-emerald-dark font-serif text-xl md:text-2xl group-hover:text-brand-gold transition-colors duration-300">
                  {occ.name}
                </h4>
                <span className="text-xs tracking-[0.3em] font-bold text-gray-400 mt-2 uppercase group-hover:text-emerald-medium transition-colors">
                  EXPLORE COLLECTIONS
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
