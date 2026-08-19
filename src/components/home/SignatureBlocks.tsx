"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { shopApi, type CollectionDoc } from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

export const SignatureBlocks = () => {
  const [collections, setCollections] = useState<CollectionDoc[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    shopApi
      .collections({ featured: true })
      .then(setCollections)
      .catch(() => setCollections([]));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, collections.length - itemsToShow);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-12 md:py-16 overflow-hidden relative" style={{ backgroundColor: "var(--bg-sage-light)" }}>
      <BotanicalDecoration className="text-emerald-900" opacity={0.03} />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-brand-gold font-serif italic tracking-[0.3em] text-xl md:text-2xl mb-2">
              Our Legacy
            </h2>
            <h3 className="text-emerald-dark font-serif text-3xl md:text-5xl lg:text-6xl">
              The Signature Collections
            </h3>
            <div className="w-24 h-[1px] bg-brand-gold/40 mt-4 mx-auto md:mx-0" />
          </div>

          {/* Navigation Arrows (Shown when items > itemsToShow) */}
          {collections.length > itemsToShow && (
            <div className="flex items-center justify-center md:justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Previous collections"
                className="w-12 h-12 rounded-full border border-emerald-900/20 text-[#0B2516] bg-white/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-[#0B2516] hover:text-[#c9a84c] hover:border-[#0B2516] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/60 disabled:hover:text-[#0B2516] disabled:hover:border-emerald-900/20 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                aria-label="Next collections"
                className="w-12 h-12 rounded-full border border-emerald-900/20 text-[#0B2516] bg-white/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-[#0B2516] hover:text-[#c9a84c] hover:border-[#0B2516] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/60 disabled:hover:text-[#0B2516] disabled:hover:border-emerald-900/20 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Collections Slider Track */}
        {collections.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Loading collections…</p>
        ) : (
          <div className="relative overflow-hidden pt-2 pb-4">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% + 24px) / ${itemsToShow}))`,
              }}
            >
              {collections.map((col, idx) => (
                <div
                  key={col._id}
                  className="shrink-0"
                  style={{
                    width: `calc((100% - ${(itemsToShow - 1) * 24}px) / ${itemsToShow})`,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative group h-[420px] overflow-hidden rounded-2xl shadow-md border border-stone-200/60"
                  >
                    <Image
                      src={resolveMediaUrl(col.image)}
                      alt={col.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center text-white z-10">
                      <span className="text-brand-gold text-xs tracking-[0.35em] font-bold uppercase mb-2 line-clamp-1">
                        {col.description || "Signature Collection"}
                      </span>
                      <h4 className="font-serif text-2xl md:text-3xl mb-6 tracking-wide line-clamp-2">
                        {col.name}
                      </h4>
                      <Link href={`/category/all?collection=${encodeURIComponent(col.slug)}`}>
                        <Button variant="outline" className="opacity-100 translate-y-0 transition-all duration-300 border-white/40 text-white hover:bg-[#c9a84c] hover:text-[#0B2516] hover:border-[#c9a84c]">
                          VIEW COLLECTION
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
