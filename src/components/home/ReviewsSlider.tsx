"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Aisha Sharma",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    rating: 5,
    text: "The craftsmanship is unparalleled. I've never seen such intricate gold work that still feels modern and wearable. A true masterpiece.",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Pure luxury. From the packaging to the jewelry itself, every detail exudes elegance. My bridal set received so many compliments!",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Exceptional service and exquisite designs. The 'Gems of Shree Aarna' truly understands what high-end jewelry should feel like.",
  },
];

export const ReviewsSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000); // 6s for better reading time
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Soft background textures */}
      {/* Soft background textures - Switch to solid low opacity */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sage/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blush/5 pointer-events-none" />

      <div className="container mx-auto px-6 text-center">
        <div className="mb-20">
          <span className="text-champagne uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">
            Client Testimonials
          </span>
          <h2 className="text-foreground text-4xl md:text-5xl font-serif">
            Voices of <span className="italic font-serif-alt text-foreground/80">Elegance</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[450px] md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={REVIEWS[index].id}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-14 bg-white rounded-[40px] border border-champagne/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-8 border-2 border-champagne/10 p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={REVIEWS[index].image}
                    alt={REVIEWS[index].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="flex space-x-1 mb-8 opacity-70">
                {[...Array(REVIEWS[index].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne text-champagne stroke-0" />
                ))}
              </div>

              <blockquote className="text-foreground/70 text-lg md:text-xl font-serif italic font-light leading-relaxed mb-10 max-w-2xl px-4">
                &quot;{REVIEWS[index].text}&quot;
              </blockquote>
              
              <div className="flex flex-col items-center">
                <h4 className="text-foreground text-xs uppercase tracking-[0.3em] font-bold mb-1">
                  {REVIEWS[index].name}
                </h4>
                <p className="text-champagne text-[9px] uppercase tracking-widest font-medium">Verified Client</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Custom Pagination */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group relative py-4"
            >
              <div className={`h-0.5 transition-all duration-700 ${
                i === index ? "w-12 bg-champagne" : "w-6 bg-foreground/10 group-hover:bg-foreground/20"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

