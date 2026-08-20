"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import { BotanicalDecoration } from "@/components/ui/BotanicalDecoration";

const REVIEWS = [
  {
    id: 1,
    name: "Kavitha",
    location: "Chennai, India",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop",
    rating: 5,
    tag: "Bridal Collection",
    text: "The craftsmanship is unparalleled. I've never seen such intricate gold work that still feels modern and wearable. A true royal masterpiece.",
  },
  {
    id: 2,
    name: "Ganesh",
    location: "Chennai, India",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240&auto=format&fit=crop",
    rating: 5,
    tag: "Haute Joaillerie",
    text: "Pure luxury. From the velvet packaging to the jewelry itself, every detail exudes elegance. My custom bridal set received endless compliments!",
  },
  {
    id: 3,
    name: "Devi",
    location:"Coimbatore, India",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=240&auto=format&fit=crop",
    rating: 5,
    tag: "Heritage Gold",
    text: "Exceptional service and exquisite designs. MaiRii truly understands what high-end, timeless jewelry should feel like on your skin.",
  },
  {
    id: 4,
    name: "Priya ",
    location: "Madurai,India",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop",
    rating: 5,
    tag: "Temple Collection",
    text: "The temple jewellery collection took my breath away. Ancient Indian heritage art brought to life with modern comfort and radiant polish.",
  },
  {
    id: 5,
    name:"Sangeetha",
    location: "Pudukottai,India",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=240&auto=format&fit=crop",
    rating: 5,
    tag: "Solitaire Diamonds",
    text: "Shopping at MaiRii was an incredible royal experience. My bespoke solitaire diamond pendant is my absolute prized possession.",
  },
  {
    id: 6,
    name: "Ananya",
    location: "Bangalore, India",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240&auto=format&fit=crop",
    rating: 5,
    tag: "Kundan Trousseau",
    text: "Choosing MaiRii for my wedding trousseau was the best decision. Every single piece tells a grand story of unmatched elegance and heritage.",
  },
];

// Tripled list for seamless infinite circular sliding
const TRIPLED_REVIEWS = [...REVIEWS, ...REVIEWS, ...REVIEWS];

export const ReviewsSlider = () => {
  // Start in the middle set (index 6)
  const [currentIndex, setCurrentIndex] = useState(REVIEWS.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Responsive cards to show count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle infinite boundary resets seamlessly without rewind jump
  useEffect(() => {
    if (currentIndex >= REVIEWS.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev - REVIEWS.length);
      }, 700);
      return () => clearTimeout(timer);
    } else if (currentIndex < REVIEWS.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev + REVIEWS.length);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex]);

  // Continuous auto-slide timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const next = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const activeDotIndex = currentIndex % REVIEWS.length;

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 select-none"
      style={{ backgroundColor: "var(--bg-mint-soft)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <BotanicalDecoration className="text-emerald-900 opacity-10" />

      {/* Gold ambient top radial light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-10 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="font-sans font-bold tracking-[0.45em] uppercase text-[11px] sm:text-xs text-[#1a3d2f]">
              Patrons of MaiRii
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-tight text-[#3a2a1a]">
            Voices of Pure{" "}
            <span className="italic text-[#d4af37] font-normal">Elegance</span>
          </h2>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center  gap-2 mt-4">
            <div className="h-px w-16 bg-[#d4af37]/30 " />
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <polygon
                points="10,1 12,8 19,8 13.5,12.5 15.5,19.5 10,15 4.5,19.5 6.5,12.5 1,8 8,8"
                fill="#d4af37"
              />
            </svg>
            <div className="h-px w-16 bg-[#d4af37]/30" />
          </div>
        </div>

        {/* Endless Round-Type Sliding Track */}
        <div className="relative overflow-hidden w-full px-1 py-4">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
            transition={
              isTransitioning
                ? { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
                : { duration: 0 }
            }
          >
            {TRIPLED_REVIEWS.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                style={{ width: `${100 / cardsToShow}%` }}
                className="shrink-0 px-3 sm:px-4"
              >
                <div className="h-full bg-white/95 backdrop-blur-md rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-[#e8dfd1] hover:border-[#d4af37] shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(26,61,47,0.12)] transition-all duration-500 group relative">
                  {/* Decorative Watermark Quote */}
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-[#d4af37]/15 group-hover:text-[#d4af37]/35 transition-colors duration-300" />

                  <div>
                    {/* Top Row: Rating Stars & Category Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#d4af37] text-[#d4af37]"
                          />
                        ))}
                      </div>
                      {/* <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#1a3d2f]/5 text-[#1a3d2f] border border-[#1a3d2f]/10">
                        {review.tag}
                      </span> */}
                    </div>

                    {/* Testimonial Quote Content */}
                    <p className="font-serif italic text-base sm:text-lg text-stone-700 leading-relaxed mb-8 font-light">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {/* Client Profile Footer */}
                  <div className="flex items-center gap-4 pt-5 border-t border-stone-100">
                    {/* Avatar with Double Gold Frame */}
                    {/* <div className="relative w-13 h-13 rounded-full overflow-hidden shrink-0 border-2 border-[#d4af37] p-0.5 shadow-sm">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          sizes="52px"
                          quality={85}
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div> */}

                    <div>
                      <h4 className="font-serif text-base font-bold text-[#1a3d2f] leading-snug">
                        {review.name}
                      </h4>
                      <p className="text-[10px] uppercase tracking-wider text-[#c9a84c] font-semibold flex items-center gap-1.5 mt-0.5">
                        <span>{review.location}</span>
                        <span>•</span>
                        <span className="flex items-center text-[#1a3d2f]">
                          <CheckCircle2 className="w-3 h-3 text-[#1a3d2f] mr-0.5" />
                          Verified
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          {/* Previous Arrow Button */}
          <button
            onClick={prev}
            aria-label="Previous card"
            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-[#d4af37]/50 text-[#1a3d2f] bg-white hover:bg-[#1a3d2f] hover:text-white hover:border-[#1a3d2f] shadow-md hover:shadow-lg cursor-pointer group/btn overflow-hidden"
          >
            <ChevronLeft className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-0.5" />
          </button>

          {/* Sliding Indicator Dots */}
          <div className="flex items-center gap-2.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(REVIEWS.length + i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className="py-2 cursor-pointer"
              >
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeDotIndex ? "36px" : "10px",
                    background:
                      i === activeDotIndex
                        ? "linear-gradient(135deg, #1a3d2f 0%, #2e5a44 100%)"
                        : "rgba(212, 175, 55, 0.35)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={next}
            aria-label="Next card"
            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-[#d4af37]/50 text-[#1a3d2f] bg-white hover:bg-[#1a3d2f] hover:text-white hover:border-[#1a3d2f] shadow-md hover:shadow-lg cursor-pointer group/btn overflow-hidden"
          >
            <ChevronRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
