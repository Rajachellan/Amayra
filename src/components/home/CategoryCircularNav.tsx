"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import neckles from "../../assets/pexels-sinu-sony-877597188-20768279.jpg"
import earing from "../../assets/pexels-kunal-lakhotia-781256899-32989029.jpg"
import rings from "../../assets/pexels-the-glorious-studio-3584518-10361481 (1).jpg"
import bangles from "../../assets/pexels-nexarostudio-25283502.jpg"
import nose_pin from "../../assets/pexels-ankunijjar-31772512.jpg"
import mangalsutra from "../../assets/pexels-the-glorious-studio-3584518-8306531.jpg"
import chain from "../../assets/pexels-thisisjooh-36160928.jpg"
import bendant from "../../assets/pexels-arif-13595746.jpg"
import others from "../../assets/pexels-arif-15684180.jpg"
import { Peddana } from "next/font/google";
const categories = [
  {
    name: "Necklaces",
    image: neckles,
    href: "/category/necklaces",
  },
  {
    name: "Earrings",
    image: earing,
    href: "/category/earrings",
  },
  {
    name: "Rings",
    image: rings,
    href: "/category/rings",
  },
  {
    name: "Bangles",
    image: bangles,
    href: "/category/bangles",
  },
  {
    name: "Nose Pins",
    image: nose_pin,
    href: "/category/nose-pins",
  },
  {
    name: "Mangalsutras",
    image: mangalsutra,
    href: "/category/mangalsutras",
  },
  {
    name: "Chains",
    image: chain,
    href: "/category/chains",
  },
  {
    name: "Pendants",
    image: bendant,
    href: "/category/pendants",
  },
  {
    name: "Others",
    image: others,
    href: "/category/other",
  },
];

export const CategoryCircularNav = () => {
  return (
    <div className="w-full bg-[#FCFAEE] py-12 border-b border-brand-gold/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-8 md:gap-14 overflow-x-auto no-scrollbar pb-6 scroll-smooth">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex-shrink-0 group flex flex-col items-center gap-3 cursor-pointer"
            >
              <Link href={cat.href} className="flex flex-col items-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full p-1 border-2 border-brand-gold/20 group-hover:border-brand-gold transition-colors duration-500 overflow-hidden bg-gray-50">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className="text-xs md:text-sm font-sans font-semibold tracking-wider text-gray-700 uppercase group-hover:text-brand-gold transition-colors mt-2">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

