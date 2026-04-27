"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import earing from "../../assets/pexels-arif-13595746.jpg"
import neckles from "../../assets/pexels-the-glorious-studio-3584518-16082502.jpg"
import hand from "../../assets/pexels-waseem-istanbuli-2149205866-33569931.jpg"
import hair from "../../assets/pexels-panditwiguna-2365106.jpg"
const categories = [
  {
    id: "earrings",
    name: "Earrings",
    image: earing,
    count: "Exclusive Collection",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    image: neckles,
    count: "Heritage Series",
  },
  {
    id: "hand-accessories",
    name: "Hand Accessories",
    image: hand,
    count: "Bridal Classics",
  },
  {
    id: "hair-accessories",
    name: "Hair Accessories",
    image: hair,
    count: "Signature Gold",
  },
];

export const SignatureBlocks = () => {
  return (
    <section className="py-10 bg-[#FCFAEE]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-brand-gold font-serif italic tracking-[0.3em] text-lg md:text-xl mb-4">
            Our Legacy
          </h2>
          <h3 className="text-brand-emerald font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
            The Signature Collections
          </h3>
          <div className="w-32 h-[1px] bg-brand-gold/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group h-[400px] overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 
  bg-gradient-to-t from-black/70 via-black/20 to-transparent 
  backdrop-blur-[4px] 
  opacity-70 group-hover:opacity-90 
  transition-all duration-500"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-center text-white">
                <span className="text-brand-gold text-xs tracking-[0.4em] font-bold uppercase mb-3">
                  {cat.count}
                </span>
                <h4 className="font-serif text-2xl md:text-3xl mb-6 tracking-wide">
                  {cat.name}
                </h4>
                <Link href={`/category/${cat.id}`}>
                  <Button variant="outline" className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    VIEW ALL
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
