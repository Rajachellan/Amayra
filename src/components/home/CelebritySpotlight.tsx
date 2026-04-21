"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Replace these with your actual image imports ───────────────────────────
import actress1 from "../../assets/actress (1).jpg";
import actress2 from "../../assets/actress (2).jpg";
import actress3 from "../../assets/actress (3).jpg";
// Add more imports as needed:
// import actress4 from "../../assets/actress (4).jpg";
// import actress5 from "../../assets/actress (5).jpg";
// import actress6 from "../../assets/actress (6).jpg";

const CELEBRITIES = [
  {
    id: 1,
    name: "Alia Bhatt",
    image: actress1,
    collection: "Heritage Diamond Edit",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Sanjana Sanghi",
    image: actress2,
    collection: "Royal Kundan Series",
    tag: "New Arrival",
  },
  {
    id: 3,
    name: "Kareena Kapoor",
    image: actress3,
    collection: "Victorian Elegance",
    tag: "Exclusive",
  },
  {
    id: 4,
    name: "Deepika Padukone",
    image: actress1, // replace with actress4
    collection: "Mughal Baroque Edit",
    tag: "Limited",
  },
  {
    id: 5,
    name: "Priyanka Chopra",
    image: actress2, // replace with actress5
    collection: "Bridal Polki Line",
    tag: "Bestseller",
  },
  {
    id: 6,
    name: "Tamannaah Bhatia",
    image: actress3, // replace with actress6
    collection: "Jadau Fusion Drop",
    tag: "New Arrival",
  },
];

// ─── Card position config ────────────────────────────────────────────────────
// rel = position relative to active card (-2, -1, 0, 1, 2)
const POSITIONS: Record<
  number,
  {
    x: string;
    z: number;
    scale: number;
    opacity: number;
    zIndex: number;
    width: string;
    height: string;
  }
> = {
  0: {
    x: "0%",
    z: 0,
    scale: 1,
    opacity: 1,
    zIndex: 30,
    width: "340px",
    height: "500px",
  },
  1: {
    x: "52%",
    z: -180,
    scale: 0.82,
    opacity: 0.55,
    zIndex: 20,
    width: "300px",
    height: "440px",
  },
  [-1]: {
    x: "-52%",
    z: -180,
    scale: 0.82,
    opacity: 0.55,
    zIndex: 20,
    width: "300px",
    height: "440px",
  },
  2: {
    x: "92%",
    z: -320,
    scale: 0.65,
    opacity: 0.2,
    zIndex: 10,
    width: "280px",
    height: "410px",
  },
  [-2]: {
    x: "-92%",
    z: -320,
    scale: 0.65,
    opacity: 0.2,
    zIndex: 10,
    width: "280px",
    height: "410px",
  },
};

const TRANSITION = { duration: 0.75, ease: [0.32, 0.72, 0, 1] as const };

export const CelebritySpotlight = () => {
  const [current, setCurrent] = useState(0);
  const total = CELEBRITIES.length;

  const getRelative = useCallback(
    (index: number) => {
      let rel = (index - current + total) % total;
      if (rel > total / 2) rel -= total;
      return rel;
    },
    [current, total]
  );

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);
  const goTo = (i: number) => setCurrent(i);

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* ── Subtle warm vignette overlay ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,183,131,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Thin champagne rule at top ────────────────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-px bg-champagne opacity-60" />

      <div className="container mx-auto px-6">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="text-center mb-14 space-y-3">
          <span
            className="block text-[10px] uppercase tracking-[0.55em] text-foreground/40 font-medium"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Exclusively Curated
          </span>
          <h2
            className="text-foreground text-4xl md:text-[52px] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Celebrity Style Spotlight
          </h2>
          {/* Double rule with champagne center dot */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="h-px w-16 bg-champagne/60" />
            <div className="w-1 h-1 rounded-full bg-champagne" />
            <div className="h-px w-16 bg-champagne/60" />
          </div>
        </div>

        {/* ── 3-D Stage ────────────────────────────────────────────────────── */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "1400px", height: "540px" }}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous celebrity"
            className="absolute left-0 md:left-6 z-40 w-11 h-11 rounded-full border border-foreground/15 bg-background flex items-center justify-center text-foreground/50 hover:border-champagne hover:text-foreground transition-all duration-400 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.2]" />
          </button>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next celebrity"
            className="absolute right-0 md:right-6 z-40 w-11 h-11 rounded-full border border-foreground/15 bg-background flex items-center justify-center text-foreground/50 hover:border-champagne hover:text-foreground transition-all duration-400 shadow-sm"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.2]" />
          </button>

          {/* Cards */}
          {CELEBRITIES.map((celeb, index) => {
            const rel = getRelative(index);
            const pos = POSITIONS[rel];
            const isActive = rel === 0;
            const isVisible = Math.abs(rel) <= 2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={celeb.id}
                initial={false}
                animate={{
                  x: pos.x,
                  z: pos.z,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                transition={TRANSITION}
                className="absolute"
                style={{
                  transformStyle: "preserve-3d",
                  cursor: isActive ? "default" : "pointer",
                  width: pos.width,
                  height: pos.height,
                }}
                onClick={() => !isActive && goTo(index)}
              >
                {/* ── Card shell ─────────────────────────────────────────── */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    boxShadow: isActive
                      ? "0 32px 80px -12px rgba(0,0,0,0.22), 0 0 0 1px rgba(212,183,131,0.18)"
                      : "0 12px 40px -8px rgba(0,0,0,0.12)",
                  }}
                >
                  {/* Image */}
                  <Image
                    src={celeb.image}
                    alt={celeb.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out"
                    style={{ transform: isActive ? "scale(1.02)" : "scale(1)" }}
                    priority={isActive}
                  />

                  {/* ── Gradient overlay (always visible for side cards) ── */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(15,12,8,0.82) 0%, rgba(15,12,8,0.18) 45%, transparent 70%)"
                        : "linear-gradient(to top, rgba(15,12,8,0.70) 0%, rgba(15,12,8,0.30) 60%, rgba(15,12,8,0.10) 100%)",
                    }}
                  />

                  {/* ── Champagne border glow on active card ──────────────── */}
                  {isActive && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 0 1px rgba(212,183,131,0.25)",
                      }}
                    />
                  )}

                  {/* ── Tag pill (top-right) ─────────────────────────────── */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="absolute top-5 right-5"
                    >
                      <span
                        className="block px-3 py-1 text-[8px] uppercase tracking-[0.4em] text-foreground border border-foreground/10 bg-background"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {celeb.tag}
                      </span>
                    </motion.div>
                  )}

                  {/* ── Bottom info ─────────────────────────────────────── */}
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key={`active-${celeb.id}`}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                          {/* Collection name */}
                          <span
                            className="block text-[9px] uppercase tracking-[0.5em] mb-2"
                            style={{
                              fontFamily: "'Raleway', sans-serif",
                              color: "var(--champagne, #D4B783)",
                            }}
                          >
                            {celeb.collection}
                          </span>

                          {/* Celebrity name */}
                          <h3
                            className="text-white text-2xl mb-1 leading-tight"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontWeight: 400,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {celeb.name}
                          </h3>

                          {/* Thin champagne rule */}
                          <div className="w-8 h-px bg-champagne/70 mb-6 mt-3" />

                          {/* CTA */}
                          <button
                            className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] text-white/80 hover:text-white transition-colors duration-300"
                            style={{ fontFamily: "'Raleway', sans-serif" }}
                          >
                            <span
                              className="px-6 py-[10px] border border-white/20 group-hover:border-champagne group-hover:bg-champagne group-hover:text-foreground transition-all duration-500"
                              style={{ color: "inherit" }}
                            >
                              Shop Style
                            </span>
                            <span className="w-6 h-px bg-white/30 group-hover:w-10 group-hover:bg-champagne transition-all duration-500" />
                          </button>
                        </motion.div>
                      ) : (
                        /* Side card — minimal label */
                        <motion.div
                          key={`side-${celeb.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span
                            className="block text-[8px] uppercase tracking-[0.4em] text-white/40 mb-1"
                            style={{ fontFamily: "'Raleway', sans-serif" }}
                          >
                            {celeb.collection}
                          </span>
                          <p
                            className="text-white/70 text-base"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontWeight: 400,
                            }}
                          >
                            {celeb.name}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Dot navigation ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {CELEBRITIES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${CELEBRITIES[i].name}`}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === current ? "36px" : "6px",
                height: "2px",
                borderRadius: "2px",
                backgroundColor:
                  i === current
                    ? "var(--champagne, #D4B783)"
                    : "rgba(0,0,0,0.18)",
              }}
            />
          ))}
        </div>

        {/* ── Counter ──────────────────────────────────────────────────────── */}
        <p
          className="text-center mt-4 text-[11px] tracking-[0.3em] text-foreground/30"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          {String(current + 1).padStart(2, "0")} &mdash;{" "}
          {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* ── Bottom champagne rule ─────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-px bg-champagne opacity-40" />
    </section>
  );
};