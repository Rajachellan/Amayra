"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import banner from "../../../public/images/grooms-indian-saber-wedding-ceremony.jpg";
import banner2 from "../../../public/images/midsection-smiling-young-bride-home.jpg";
import banner3 from "../../../public/images/woman-wears-gold-sari-with-green-gold-jewelry.jpg";

const slides = [
  {
    id: 1,
    image: banner,
    title: "Celestial\nBridal Couture",
    subtitle: "The Santorini Luxe Series",
    description: "Discover the magic of heritage craftsmanship designed for your most special moments.",
    badge: "Exclusive Launch",
    cta: "Explore Bridal Collections",
    href: "/category/bridal",
  },
  {
    id: 2,
    image: banner3,
    title: "Ethereal\nRadiance",
    subtitle: "Vintage Kundan Masterpieces",
    description: "Handcrafted 22K gold jewellery that celebrates the timeless beauty of tradition.",
    badge: "Best Seller",
    cta: "Shop Heritage",
    href: "/category/heritage",
  },
  {
    id: 3,
    image: banner2,
    title: "Timeless\nBrilliance",
    subtitle: "Victorian Diamond Collection",
    description: "Experience the brilliance of ethically sourced diamonds handset in vintage-inspired settings.",
    badge: "New Release",
    cta: "View Diamonds",
    href: "/category/diamonds",
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 1200);
  };

  const nextSlide = () => goTo(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => goTo(current === 0 ? slides.length - 1 : current - 1);

  return (
    <>
      {/* Google Fonts — add this once in your layout.tsx <head> instead if preferred */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .hero-title { white-space: pre-line; }
        @keyframes progress-bar {
          from { height: 0%; }
          to   { height: 100%; }
        }
        .animate-progress { animation: progress-bar 6s linear forwards; }
        .cta-fill {
          position: absolute;
          inset: 0;
          background: #c9a84c;
          transform: translateX(-101%);
          transition: transform 0.55s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .cta-btn:hover .cta-fill { transform: translateX(0); }
      `}</style>

      <section className="relative w-full overflow-hidden bg-[#0a0805]" style={{ height: "100svh", minHeight: 700 }}>

        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background image */}
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Directional dark overlay — left heavy so text is always readable */}
            <div
              className="absolute inset-0 z-10"
              style={{ background: "linear-gradient(105deg, rgba(8,6,4,0.88) 0%, rgba(8,6,4,0.58) 55%, rgba(8,6,4,0.22) 100%)" }}
            />
            {/* Bottom vignette */}
            <div
              className="absolute inset-0 z-10"
              style={{ background: "linear-gradient(to top, rgba(8,6,4,0.72) 0%, transparent 45%)" }}
            />

            {/* ── CONTENT ── */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-[8%]" style={{ maxWidth: 700 }}>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="flex items-center gap-3 mb-7"
              >
                <div className="h-px w-7 bg-[#c9a84c]" />
                <span className="font-montserrat text-[10px] font-medium uppercase tracking-[0.35em] text-[#c9a84c]">
                  {slides[current].badge}
                </span>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-cormorant mb-3 text-lg italic tracking-[0.12em] text-[#c9a84c]/80"
                style={{ fontWeight: 300 }}
              >
                {slides[current].subtitle}
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="hero-title font-cormorant mb-5 leading-[1.0] text-white"
                style={{ fontWeight: 300, fontSize: "clamp(48px, 7vw, 80px)" }}
              >
                {slides[current].title}
              </motion.h1>

              {/* Ornament line + diamond */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="mb-5 flex items-center gap-3"
              >
                <div className="h-px w-14 bg-[#c9a84c]/50" />
                <div className="h-[6px] w-[6px] rotate-45 bg-[#c9a84c]" />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="font-montserrat mb-10 max-w-md text-sm font-light leading-loose tracking-widest text-white/60"
              >
                {slides[current].description}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex items-center gap-6"
              >
                <Link
                  href={slides[current].href}
                  className="cta-btn font-montserrat relative inline-flex items-center gap-3 overflow-hidden border border-[#c9a84c]/50 px-8 py-[14px] text-[10px] font-medium uppercase tracking-[0.3em] text-[#c9a84c] transition-colors duration-500 hover:text-[#1a1209] hover:border-[#c9a84c]"
                >
                  <div className="cta-fill" />
                  <span className="relative z-10">{slides[current].cta}</span>
                  {/* Arrow */}
                  <span className="relative z-10 flex items-center">
                    <span className="block h-px w-4 bg-current transition-all duration-500 group-hover:w-6" />
                    <span
                      className="ml-[-1px] block h-[6px] w-[6px] rotate-45 border-t border-r border-current"
                      style={{ marginLeft: -4 }}
                    />
                  </span>
                </Link>

                <span className="font-montserrat cursor-pointer text-[10px] font-light uppercase tracking-[0.25em] text-white/35 transition-colors duration-300 hover:text-white/65">
                  View Lookbook
                </span>
              </motion.div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── CORNER BRACKETS ── */}
        <div className="pointer-events-none absolute left-6 top-6 z-30 h-10 w-10 border-l border-t border-[#c9a84c]/30" />
        <div className="pointer-events-none absolute bottom-6 right-36 z-30 h-10 w-10 border-b border-r border-[#c9a84c]/30" />

        {/* ── SLIDE COUNTER ── */}
        <div className="absolute right-14 top-10 z-30 font-montserrat text-[10px] tracking-[0.2em] text-white/25">
          <span className="text-[#c9a84c]/70">{String(current + 1).padStart(2, "0")}</span>
          {" / "}
          {String(slides.length).padStart(2, "0")}
        </div>

        {/* ── NAVIGATION ARROWS ── */}
        <div className="absolute bottom-12 right-12 z-30 flex gap-0.5">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/55 transition-all duration-300 hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/55 transition-all duration-300 hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* ── VERTICAL INDICATORS ── */}
        <div className="absolute bottom-12 left-12 z-30 flex flex-col gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`flex items-center gap-2.5 transition-opacity duration-300 ${idx === current ? "opacity-100" : "opacity-35 hover:opacity-60"
                }`}
            >
              {/* Progress bar */}
              <div className="relative h-8 w-px overflow-hidden bg-[#c9a84c]/30">
                {idx === current && (
                  <div className="animate-progress absolute left-0 top-0 w-full bg-[#c9a84c]" />
                )}
              </div>
              <span className="font-montserrat text-[10px] tracking-[0.15em] text-[#c9a84c]">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

      </section>
    </>
  );
};