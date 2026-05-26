"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { shopApi } from "@/lib/api/shop";
import { resolveMediaUrl } from "@/lib/apiBase";

type Slide = {
  id: string;
  image: string;
  title: string;
  tagline: string;
  cta: string;
  link: string;
};

const FALLBACK_SLIDES: Slide[] = [
  {
    id: "fallback-1",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2000&auto=format&fit=crop",
    title: "Elegance Redefined",
    tagline: "Discover curated masterpieces designed for those who appreciate heritage artistry.",
    cta: "Explore Collection",
    link: "/category/all",
  },
];

export const Hero = () => {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    shopApi
      .banners()
      .then((list) => {
        if (!list.length) return;
        setSlides(
          list.map((b) => ({
            id: b._id,
            image: resolveMediaUrl(b.image),
            title: b.title,
            tagline: b.subtitle || "",
            cta: b.ctaLabel || "Discover",
            link: b.link || "/category/all",
          }))
        );
        setCurrentIndex(0);
      })
      .catch(() => {});
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide, slides.length]);

  const slide = slides[currentIndex] ?? slides[0];

  return (
    <section
      className="relative w-full h-[90vh]  min-h-[600px] overflow-hidden bg-background"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 6, ease: "linear" }}
            className="relative w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.85]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
          <div className="absolute inset-0 bg-black/10 z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center z-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl lg:items-start lg:text-left items-center text-center flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="space-y-4 mt-40">
                  <motion.span
                    initial={{ letterSpacing: "0.2em" }}
                    animate={{ letterSpacing: "0.6em" }}
                    className="text-champagne uppercase text-[10px] md:text-xs font-bold block"
                  >
                    Exclusive Collection
                  </motion.span>

                  <h1 className="text-white text-4xl md:text-5xl font-serif leading-[1.1] tracking-tight drop-shadow-xl">
                    {slide.title.split(" ").map((word, i) => (
                      <span key={i} className={i % 2 !== 0 ? "italic font-light opacity-90" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </h1>
                </div>

                <div className="backdrop-blur-md bg-white/10 p-5  rounded-2xl border border-white/10 luxury-shadow-hover inline-block max-w-xl">
                  <p className="text-white/95 font-mono text-xs md:text-sm font-light tracking-[0.2em] leading-relaxed uppercase">
                    {slide.tagline}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 pt-4">
                  <Link
                    href={slide.link}
                    className="px-14 py-5 rounded-full bg-white text-foreground text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:bg-champagne hover:text-white hover:scale-105 shadow-2xl"
                  >
                    {slide.cta}
                  </Link>
                  <button type="button" className="text-white text-[10px] uppercase tracking-[0.4em] font-medium gold-hover py-2 hidden md:block">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10 hidden lg:block" />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        {slides.map((s, index) => (
          <button
            type="button"
            key={s.id}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${currentIndex === index
              ? "w-8 h-[2px] bg-champagne"
              : "w-2 h-[2px] bg-white/40 hover:bg-white"
              }`}
          />
        ))}
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-30 hidden lg:flex">
        <span className="text-white/20 text-[8px] uppercase tracking-[0.6em] rotate-90 mb-8">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};
