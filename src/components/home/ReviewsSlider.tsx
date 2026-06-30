"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Aisha Sharma",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    rating: 5,
    text: "The craftsmanship is unparalleled. I've never seen such intricate gold work that still feels modern and wearable. A true masterpiece.",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Pure luxury. From the packaging to the jewelry itself, every detail exudes elegance. My bridal set received so many compliments!",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Exceptional service and exquisite designs. Mairii truly understands what high-end jewelry should feel like.",
  },
];

export const ReviewsSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIndex((prev) => (prev + 1) % REVIEWS.length);

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"

    >
      {/* Gold ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(196,160,100,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Decorative quote mark */}
      <div
        className="absolute top-12 left-10 font-serif text-[180px] leading-none select-none pointer-events-none"
        style={{ color: "rgba(196,160,100,0.08)" }}
      >
        "
      </div>

      <div className="relative container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-px" style={{ background: "rgba(196,160,100,0.5)" }} />
            <span
              className="font-sans font-bold tracking-[0.45em] uppercase text-[10px]"
              style={{ color: "#C4A064" }}
            >
              Client Testimonials
            </span>
            <div className="w-10 h-px" style={{ background: "rgba(196,160,100,0.5)" }} />
          </div>

          <h2
            className="font-serif text-4xl md:text-5xl leading-tight"
            style={{ color: "#4A3F35" }}
          >
            Voices of{" "}
            <span className="italic" style={{ color: "#C4A064" }}>
              Elegance
            </span>
          </h2>
        </div>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto min-h-[360px] md:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={REVIEWS[index].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16"
            >
              {/* Avatar */}
              <div
                className="relative w-20 h-20 rounded-full overflow-hidden mb-6"
                style={{
                  border: "2px solid rgba(196,160,100,0.4)",
                  padding: "3px",
                  boxSizing: "border-box",
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={REVIEWS[index].image}
                    alt={REVIEWS[index].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-6">
                {[...Array(REVIEWS[index].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 stroke-0"
                    style={{ fill: "#C4A064", color: "#C4A064" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="font-serif italic text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl"
                style={{ color: "rgba(65, 64, 64, 0.8)" }}
              >
                &ldquo;{REVIEWS[index].text}&rdquo;
              </blockquote>

              {/* Author */}
              <h4
                className="text-xs uppercase tracking-[0.35em] font-bold mb-1"
                style={{ color: "#4A3F35" }}
              >
                {REVIEWS[index].name}
              </h4>
              <p
                className="text-[9px] uppercase tracking-widest"
                style={{ color: "#C4A064" }}
              >
                {REVIEWS[index].location} &nbsp;·&nbsp; Verified Client
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 mt-8">
          {/* Prev */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: "1px solid rgba(196,160,100,0.3)",
              color: "rgba(196,160,100,0.7)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(196,160,100,0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,160,100,0.7)";
              (e.currentTarget as HTMLElement).style.color = "#C4A064";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,160,100,0.3)";
              (e.currentTarget as HTMLElement).style.color = "rgba(196,160,100,0.7)";
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="group relative py-3"
              >
                <div
                  className="h-px transition-all duration-500"
                  style={{
                    width: i === index ? "40px" : "20px",
                    background:
                      i === index
                        ? "#C4A064"
                        : "rgba(196,160,100,0.25)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: "1px solid rgba(196,160,100,0.3)",
              color: "rgba(196,160,100,0.7)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(196,160,100,0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,160,100,0.7)";
              (e.currentTarget as HTMLElement).style.color = "#C4A064";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,160,100,0.3)";
              (e.currentTarget as HTMLElement).style.color = "rgba(196,160,100,0.7)";
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
