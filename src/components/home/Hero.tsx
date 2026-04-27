"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "../../../public/images/banner-8.jpg"
import banner2 from "../../../public/images/banner4.jpg"
import banner3 from "../../../public/images/banner3.jpg"
import banner4 from "../../../public/images/banner5.jpg"
import banner5 from "../../../public/images/banner-9.jpg"
const SLIDES = [
  {
    id: 1,
    image: banner3,
    title: "Elegance Redefined",
    tagline: "Discover curated masterpieces designed for those who appreciate heritage artistry.",
    cta: "Explore Collection",
    link: "/category/all"
  },
  {
    id: 2,
    image: banner2,
    title: "The Bridal Edit",
    tagline: "Unveiling timeless treasures crafted for your most unforgettable moments.",
    cta: "Discover Bridal",
    link: "/category/bridal"
  },
  {
    id: 3,
    image: banner1,
    title: "Heritage Brilliance",
    tagline: "Artisanal excellence passed down through generations of master craftsmen.",
    cta: "Our Story",
    link: "/about"
  },
  {
    id: 4,
    image: banner4,
    title: "Modern Refinement",
    tagline: "Clean lines and contemporary designs for the modern visionary.",
    cta: "Shop Minimal",
    link: "/category/modern"
  },
  {
    id: 5,
    image: banner5,
    title: "The Atelier Mood",
    tagline: "Step into the world of Shree Aarna, where every gem tells a deep story.",
    cta: "Visit Atelier",
    link: "/about"
  }
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section
      className="relative w-full h-[90vh]  min-h-[600px] overflow-hidden bg-background"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Background Image with Slow Zoom */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 6, ease: "linear" }}
            className="relative w-full h-full"
          >
            <Image
              src={SLIDES[currentIndex].image}
              alt={SLIDES[currentIndex].title}
              fill
              priority
              className="object-cover object-center brightness-[0.85]"
            />
          </motion.div>

          {/* Multi-layered Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
          <div className="absolute inset-0 bg-black/10 z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl lg:items-start lg:text-left items-center text-center flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
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
                    {SLIDES[currentIndex].title.split(" ").map((word, i) => (
                      <span key={i} className={i % 2 !== 0 ? "italic font-light opacity-90" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </h1>
                </div>

                <div className="backdrop-blur-md bg-white/10 p-5  rounded-2xl border border-white/10 luxury-shadow-hover inline-block max-w-xl">
                  <p className="text-white/95 font-mono text-xs md:text-sm font-light tracking-[0.2em] leading-relaxed uppercase">
                    {SLIDES[currentIndex].tagline}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 pt-4">
                  <Link
                    href={SLIDES[currentIndex].link}
                    className="px-14 py-5 rounded-full bg-white text-foreground text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:bg-champagne hover:text-white hover:scale-105 shadow-2xl"
                  >
                    {SLIDES[currentIndex].cta}
                  </Link>
                  <button className="text-white text-[10px] uppercase tracking-[0.4em] font-medium gold-hover py-2 hidden md:block">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Subtle Light Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10 hidden lg:block" />


      {/* Navigation Arrows */}
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between items-center z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/10 backdrop-blur-md flex items-center justify-center text-white transition-all hover:bg-white hover:text-foreground pointer-events-auto group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/10 backdrop-blur-md flex items-center justify-center text-white transition-all hover:bg-white hover:text-foreground pointer-events-auto group"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${currentIndex === index
                ? "w-8 h-[2px] bg-champagne"
                : "w-2 h-[2px] bg-white/40 hover:bg-white"
              }`}
          />
        ))}
      </div>

      {/* Vertical Indicator */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-30 hidden lg:flex">
        <span className="text-white/20 text-[8px] uppercase tracking-[0.6em] rotate-90 mb-8">Scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};