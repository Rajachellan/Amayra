"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { shopApi } from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

export const CategorySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [categories, setCategories] = useState<
    { name: string; slug: string; image: string; desc: string }[]
  >([]);

  useEffect(() => {
    function loadCategories() {
      shopApi
        .categories({ featured: true })
        .then((list) => {
          setCategories(
            list.map((c) => ({
              name: c.name,
              slug: c.slug,
              image: resolveMediaUrl(c.image),
              desc: c.description?.slice(0, 80) || "Handcrafted luxury",
            }))
          );
        })
        .catch(() => setCategories([]));
    }
    loadCategories();
    const onVisible = () => {
      if (document.visibilityState === "visible") loadCategories();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

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
  }, [categories.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-pearl-green)' }}>
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-yellow-600 font-serif italic tracking-[0.3em] text-md md:text-lg mb-3"
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
              type="button"
              onClick={() => scroll("left")}
              className={`w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center transition-all ${canScrollLeft ? "opacity-100 hover:bg-champagne hover:text-white" : "opacity-30 cursor-not-allowed"
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className={`w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center transition-all ${canScrollRight ? "opacity-100 hover:bg-champagne hover:text-white" : "opacity-30 cursor-not-allowed"
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
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.length === 0 && (
            <p className="text-sm text-gray-400 py-12">Loading categories…</p>
          )}
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              className="min-w-[240px] md:min-w-[calc(33.33%-16px)] lg:min-w-[calc(25%-18px)] snap-start group"
            >
              <Link href={`/category/${cat.slug}`} className="block relative">
                <div className="relative aspect-[4/5] bg-white p-2 rounded-t-full rounded-b-3xl shadow-xl border border-champagne/10 mb-5 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-champagne/20 group-hover:-translate-y-2">
                  <div className="relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden">
                    <Image
                      key={cat.image}
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 45vw, 25vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    <div className="absolute bottom-6 left-0 w-full text-center px-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white/80 text-[7px] uppercase tracking-[0.4em] mb-1.5 line-clamp-2">{cat.desc}</p>
                      <h4 className="text-white font-serif text-xl tracking-wide">{cat.name}</h4>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-2">
                <span className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-champagne text-yellow-300 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-champagne hover:text-emerald-dark">
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
