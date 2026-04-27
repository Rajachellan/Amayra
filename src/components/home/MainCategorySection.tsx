"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import necklace from "../../assets/festival.jpg"
import earrings from "../../assets/kammal_6.jpg"
import rings from "../../assets/pexels-arif-15684180.jpg"
import bangles from "../../assets/bangles_7.jpg"
import anklets from "../../assets/silver.jpg"
import armlets from "../../assets/hip_chain.jpg"
import hair from "../../assets/actress (1).jpg"
import nosepins from "../../assets/bridal_collections/nosepin.jpg"
import mangalsutra from "../../assets/bridal_collections.jpg"
import accessories from "../../assets/silver_collection (1).jpg"

const categories = [
  {
    name: "Necklace",
    image: necklace,
    href: "/category/necklaces",
    desc: "Elegant Neckpieces"
  },
  {
    name: "Earrings",
    image: earrings,
    href: "/category/earrings",
    desc: "Divine Ear Adornments"
  },
  {
    name: "Rings",
    image: "/images/ring5.jpg",
    href: "/category/rings",
    desc: "Timeless Bands"
  },
  {
    name: "Bangles",
    image:"/images/bangles.jpg",
    href: "/category/bangles",
    desc: "Traditional Wristwear"
  },
  {
    name: "Anklets",
    image: "/images/Anklets_2.jpg",
    href: "/category/anklets",
    desc: "Graceful Feet Accents"
  },
  {
    name: "Armlets",
    image: "/images/armlets.jpg",
    href: "/category/armlets",
    desc: "Royal Vanki Designs"
  },
  {
    name: "Hair Accessories",
    image: "/images/hair_accesories_1.jpg",
    href: "/category/hair-accessories",
    desc: "Exquisite Head Ornaments"
  },
  {
    name: "Nose Pins",
    image: "/images/nose.jpg",
    href: "/category/nose-pins",
    desc: "Subtle Facial Artistry"
  },
  {
    name: "Mangalsutra",
    image: "/images/mangalstra.jpg",
    href: "/category/mangalsutra",
    desc: "Sacred Bonds of Love"
  },
  {
    name: "Accessories",
    image: "/images/hand_accesorries.jpg",
    href: "/category/accessories",
    desc: "Essential Jewelry Pairings"
  },
];

export const CategorySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-[#FCFAEE] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-champagne font-serif italic tracking-[0.3em] text-sm md:text-base mb-3"
            >
              Curated Collections
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground font-serif text-3xl md:text-4xl lg:text-5xl"
            >
              Shop by Category
            </motion.h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              className={`w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center transition-all ${
                canScrollLeft ? "opacity-100 hover:bg-champagne hover:text-white" : "opacity-30 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center transition-all ${
                canScrollRight ? "opacity-100 hover:bg-champagne hover:text-white" : "opacity-30 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 pt-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              className="min-w-[240px] md:min-w-[calc(33.33%-16px)] lg:min-w-[calc(25%-18px)] snap-start group"
            >
              <Link href={cat.href} className="block relative">
                {/* Outer Layout with Gap */}
                <div className="relative aspect-[4/5] bg-white p-2 rounded-t-full rounded-b-3xl shadow-xl border border-champagne/10 mb-5 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-champagne/20 group-hover:-translate-y-2">
                  
                  {/* Inner Image Container */}
                  <div className="relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-6 left-0 w-full text-center px-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white/80 text-[7px] uppercase tracking-[0.4em] mb-1.5">{cat.desc}</p>
                      <h4 className="text-white font-serif text-xl tracking-wide">{cat.name}</h4>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="inline-block text-[9px] tracking-[0.4em] font-bold text-champagne uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                    Explore More
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
